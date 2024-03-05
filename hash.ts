import xxhash from "xxhash-wasm";

const xxh = await xxhash();

export type HashDB = Record<string, Record<string, object>>;
export type Hasher = (e: Element) => string;

const xmlTruths = new Set(["true", "1"]);
function isXmlTrue(val: string | null): boolean {
  return val !== null && xmlTruths.has(val.trim());
}

/** Get count from referenced sibling element */
function siblingCount(element: Element, name: string): number {
  const parent = element.parentElement;
  if (!parent) return NaN;

  const sibling = Array.from(parent.children).find(
    (child) => child.getAttribute("name") === name,
  );
  if (!sibling) return NaN;

  const count = sibling.getAttribute("count");
  if (!count) return NaN;

  if (!/^\d+$/.test(count)) return NaN;

  return parseInt(count, 10);
}

const attributes: {
  int: string[];
  bool: string[];
  defaults: Record<string, string | boolean | number>;
} = {
  int: ["count", "ord", "sGroup"],
  bool: ["transient", "dchg", "dupd", "qchg"],
  defaults: { fc: "ST" },
};

export function hasher(
  db: HashDB,
  {
    ignoreAttrs = new Set(["desc", "id", "name", "type"]),
    hashENS,
  }: { ignoreAttrs?: Set<string>; hashENS?: string[] } = {},
): (e: Element) => string {
  function describeAttributes(e: Element) {
    const description: Record<string, string | number | boolean> = {};

    const { int, bool, defaults } = attributes;

    Array.from(e.attributes)
      .map((a) => a.localName)
      .filter((a) => !ignoreAttrs.has(a))
      .sort()
      .forEach((name) => {
        if (name in defaults) description[name] = defaults[name];
        let val: string | number | boolean | null = e.getAttribute(name);
        if (!val) return;
        if (int.includes(name)) val = Number.parseInt(val ?? "", 10);
        if (bool.includes(name)) val = isXmlTrue(val as string);
        description[name] = val;
      });

    return description;
  }

  function describeChildren(e: Element, ...tags: string[]) {
    const description: Record<string, string[]> = {};
    const children = Array.from(e.children);
    tags.forEach((tag) => {
      const hashes = children
        .filter((c) => c.tagName === tag)
        .map(hash)
        .sort();
      if (hashes.length) description["@" + tag] = hashes;
    });
    return description;
  }

  function describeNaming(e: Element) {
    const children = Array.from(e.children)
      .map((c) => c.tagName)
      .filter((c, i, arr) => arr.indexOf(c) === i);
    const description: Record<string, unknown> = {
      ...describeChildren(e, "Private", "Text", ...children),
      ...describeAttributes(e),
    };
    const eNSAttrs = Array.from(e.attributes).filter((a) => a.namespaceURI);
    if (eNSAttrs.length) {
      const eNS = {} as Record<string, Record<string, string>>;
      eNSAttrs
        .sort((a, b) => a.localName.localeCompare(b.localName))
        .sort((a, b) => a.namespaceURI!.localeCompare(b.namespaceURI!))
        .forEach((attr) => {
          if (hashENS && !hashENS.includes(attr.namespaceURI!)) return;
          if (!(attr.namespaceURI! in eNS)) eNS[attr.namespaceURI!] = {};
          eNS[attr.namespaceURI!][attr.localName] = attr.value;
        });
      description.eNS = eNS;
    }
    if (!ignoreAttrs.has("desc")) {
      const desc = e.getAttribute("desc");
      if (desc) description.desc = desc;
    }
    return description;
  }

  function describeBDA(e: Element) {
    const description: Record<string, unknown> = {
      ...describeNaming(e),
      bType: e.getAttribute("bType"),
      valKind: "Set",
      valImport: false,
      count: 0,
    };

    const [sAddr, valKind, valImport, type, count] = [
      "sAddr",
      "valKind",
      "valImport",
      "type",
      "count",
    ].map((attr) => e.getAttribute(attr));

    if (sAddr) description.sAddr = sAddr;

    if (valKind && ["Spec", "Conf", "RO", "Set"].includes(valKind))
      description.valKind = valKind as "Spec" | "RO" | "Conf" | "Set";

    if (isXmlTrue(valImport)) description.valImport = true;

    if (count && /^\d+$/.test(count) && !isNaN(parseInt(count, 10)))
      // count can be an unsigned integer
      description.count = parseInt(count, 10);
    else if (count && !isNaN(siblingCount(e, count)))
      // count can be a reference to another sibling that has integer definition
      description.count = siblingCount(e, count);

    const referencedType = Array.from(
      e.closest("DataTypeTemplates")?.children ?? [],
    ).find((child) => child.getAttribute("id") === type);
    if (referencedType)
      description["@" + referencedType.tagName] = [hash(referencedType)];

    return description;
  }

  function describeDA(e: Element) {
    const description = {
      ...describeChildren(e, "ProtNs"),
      ...describeBDA(e),
      ...describeAttributes(e),
    } as Record<string, unknown>;

    return description;
  }

  const descriptions: Record<string, (e: Element) => object> = {
    BDA: describeBDA,
    DA: describeDA,
    DataTypeTemplates: describeNaming,
    DAType: (e) => describeNaming(e),
    DO: (e) => {
      const template = Array.from(
        e.closest("DataTypeTemplates")?.children ?? [],
      ).find((child) => child.getAttribute("id") === e.getAttribute("type"));
      return {
        ...describeAttributes(e),
        ...describeNaming(e),
        [`@${template?.tagName}`]: template ? [hash(template)] : [],
      };
    },
    DOType: (e) => ({
      ...describeAttributes(e),
      ...describeNaming(e),
    }),
    EnumType: (e) => describeNaming(e),
    EnumVal: (e) => ({
      ...describeNaming(e),
      val: e.textContent ?? "",
    }),
    LNodeType: (e) => ({
      ...describeNaming(e),
      ...describeAttributes(e),
    }),
    ProtNs: (e) => ({
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      type: e.getAttribute("type") || "8-MMS",
      val: e.textContent ?? "",
    }),
    Val: (e) =>
      Object.assign(
        { val: e.textContent ?? "" },
        e.getAttribute("sGroup") && {
          sGroup: parseInt(e.getAttribute("sGroup") ?? "", 10),
        },
      ) as object,
  };

  function describe(e: Element) {
    if (e.tagName in descriptions) return descriptions[e.tagName](e);
    return { xml: e.outerHTML };
  }

  function hash(e: Element) {
    const tag =
      e.namespaceURI === e.ownerDocument.documentElement.namespaceURI
        ? e.localName
        : e.localName + "@" + e.namespaceURI;
    const description = describe(e);
    const digest = xxh.h64ToString(JSON.stringify(description));
    if (!(tag in db)) db[tag] = {};
    if (!(digest in db[tag])) db[tag][digest] = description;
    return digest;
  }

  return hash;
}

export function newHasher(options = {}): { hash: Hasher; db: HashDB } {
  const db: HashDB = {};
  return { hash: hasher(db, options), db };
}
