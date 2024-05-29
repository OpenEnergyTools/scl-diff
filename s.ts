import xxhash from "xxhash-wasm";

const xxh = await xxhash();

export type HashDB = Record<string, Record<string, object>>;
export type Hasher = (e: Element) => string;

const db: HashDB = {};
let maxDepth = 0;

function describe(e: Element, depth: number): object {
  const description: Record<string, string | string[]> = {};

  const children = Array.from(e.children);

  if (depth > maxDepth) {
    maxDepth = depth;
  }

  Array.from(e.attributes)
    .map((a) => a.localName)
    .sort()
    .forEach((name) => {
      const val = e.getAttribute(name);
      if (name === "type") {
        const ref = e.ownerDocument.querySelector(`[name="${val}"]`);
        if (ref) children.push(ref);
      }
      if (!val) return;
      description[name] = val;
    });

  children
    .map((c) => c.tagName)
    .sort()
    .forEach((tag) => {
      const hashes = children
        .filter((c) => c.tagName === tag)
        .map((c) => hash(c, depth + 1))
        .sort();
      if (hashes.length) description["@" + tag] = hashes;
    });

  return description;
}

const hashed = new WeakMap<Element, string>();
function hash(e: Element, depth = 0): string {
  if (hashed.has(e)) return hashed.get(e)!;
  if (depth > 20 && ["tProcess", "tSDI"].includes(e.getAttribute("name") ?? ""))
    return e.getAttribute("name") + "Hash";
  const tag =
    e.namespaceURI === e.ownerDocument.documentElement.namespaceURI
      ? e.localName
      : e.localName + "@" + e.namespaceURI;
  const description = describe(e, depth);
  const digest = xxh.h64ToString(JSON.stringify(description));
  if (!(tag in db)) db[tag] = {};
  const name = e.getAttribute("name");
  if (name) {
    if (!(name in db[tag])) db[tag][name] = description;
    else {
      console.log(name, "is not", digest);
      if (!(digest in db[tag])) db[tag][digest] = description;
    }
  } else if (!(digest in db[tag])) db[tag][digest] = description;
  hashed.set(e, digest);
  return digest;
}

export type XMLTree = (string | Record<string, string> | XMLTree)[];
const s: Record<string, (string | object)[]> = {};

const schema = new DOMParser().parseFromString(
  await fetch("./2007B4.xml").then((res) => res.text()),
  "application/xml",
);

Array.from(schema.querySelectorAll("element")).forEach((e) => {
  const name = e.getAttribute("name");
  if (!name) return;
  const h = hash(e);
  if (name in s && !s[name].includes(h)) s[name].push(h);
  else s[name] = [h];
});

Object.keys(s).forEach((key) => {
  if (s[key].length < 2) delete s[key];
  else {
    s[key].forEach((e, i, arr) => {
      arr[i] = db.element[e as string];
    });
  }
});

console.log(JSON.stringify(db, null, 2));

export { s };
