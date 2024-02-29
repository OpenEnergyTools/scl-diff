import xxhash from "xxhash-wasm";

const xxh = await xxhash();

export type HashDB = Record<string, Record<string, object>>;
export type Hasher = (e: Element) => string;

const xmlTruths = new Set(["true", "1"]);
function isXmlTrue(val: string | null): boolean {
  return val !== null && xmlTruths.has(val.trim());
}

const fCs = new Set([
  "ST",
  "MX",
  "CO",
  "SP",
  "SG",
  "SE",
  "SV",
  "CF",
  "DC",
  "EX",
]);

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

export function hasher(
  db: HashDB,
  { hashDesc = true, hashENS }: { hashDesc?: boolean; hashENS?: string[] } = {},
): (e: Element) => string {
  function describeAttributes(
    e: Element,
    {
      str = [],
      int = [],
      bool = [],
      defaults = {},
    }: {
      str?: string[];
      int?: string[];
      bool?: string[];
      defaults?: Record<string, string | number | boolean>;
    },
  ) {
    const description: Record<string, string | number | boolean> = {};

    str.forEach((name) => {
      if (name in defaults) description[name] = defaults[name];
      const val = e.getAttribute(name);
      if (val) description[name] = val;
    });

    int.forEach((name) => {
      if (name in defaults) description[name] = defaults[name];
      const val = e.getAttribute(name);
      if (val) description[name] = Number.parseInt(val ?? "", 10);
    });

    bool.forEach((name) => {
      if (name in defaults) description[name] = defaults[name];
      const val = isXmlTrue(e.getAttribute(name));
      if (val) description[name] = true;
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

  function describeNaming(e: Element, ...children: string[]) {
    const description: Record<string, unknown> = describeChildren(
      e,
      "Private",
      "Text",
      ...children,
    );
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
    if (hashDesc) {
      const desc = e.getAttribute("desc");
      if (desc) description.desc = desc;
    }
    return description;
  }

  function describeBDA(e: Element) {
    const description: Record<string, unknown> = {
      ...describeNaming(e, "Val"),
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

    if (valImport && valImport === "true") description.valImport = true;

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
      fc: "ST",
    } as Record<string, unknown>;

    const [dchg, qchg, dupd, fc] = ["dchg", "qchg", "dupd", "fc"].map((attr) =>
      e.getAttribute(attr),
    );
    if (isXmlTrue(dchg)) description.dchg = true;
    if (isXmlTrue(qchg)) description.qchg = true;
    if (isXmlTrue(dupd)) description.dupd = true;
    if (fc && fCs.has(fc)) description.fc = fc;

    return description;
  }

  const descriptions: Record<string, (e: Element) => object> = {
    BDA: describeBDA,
    DA: describeDA,
    DAType: (e) => describeNaming(e, "BDA", "ProtNs"),
    DOType: (e) => describeNaming(e, "DA", "SDO"),
    EnumType: (e) => describeNaming(e, "EnumVal"),
    EnumVal: (e) =>
      Object.assign(
        {
          ord: parseInt(e.getAttribute("ord") ?? "", 10),
          val: e.textContent ?? "",
        },
        hashDesc && e.getAttribute("desc") && { desc: e.getAttribute("desc") },
      ) as object,
    LNodeType: (e) => ({
      ...describeNaming(e, "DO"),
      ...describeAttributes(e, { str: ["lnClass", "iedType"] }),
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
