import { DAType, DATypeDescription } from "./DAType.js";
import { EnumType, EnumTypeDescription } from "./EnumType.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { ValDescription, describeVal, compareBySGroup } from "./Val.js";

export function isAbstractDataAttributeDescription(
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  type: any,
): type is AbstractDataAttributeDescription {
  return (
    "bType" in type &&
    "count" in type &&
    "valImport" in type &&
    "vals" in type &&
    "valKind" in type
  );
}

export interface AbstractDataAttributeDescription extends NamingDescription {
  /** Required (B)DA bType attribute sAddr */
  bType: string;
  /** Reference to DAType (bType: Struct) or EnumType(bType: Enum) */
  type?: DATypeDescription | EnumTypeDescription;
  /** (B)DA sAddr attribute sAddr */
  sAddr?: string;
  /** (B)DA valKind attribute defaulting to "Set" */
  valKind: "Spec" | "Conf" | "RO" | "Set";
  /** (B)DA valKind attribute defaulting false */
  valImport: boolean;
  /** (B)DA valKind attribute defaulting 0 */
  count: number;
  vals: ValDescription[];
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

export function describeDAorSDAorDAI(
  element: Element,
): AbstractDataAttributeDescription {
  const abstractDataAttributeDesc: AbstractDataAttributeDescription = {
    ...describeNaming(element),
    bType: element.getAttribute("bType") ?? "undefined",
    valKind: "Set",
    valImport: false,
    count: 0,
    vals: [],
  };

  const [sAddr, valKind, valImport, type, count] = [
    "sAddr",
    "valKind",
    "valImport",
    "type",
    "count",
  ].map((attr) => element.getAttribute(attr));

  if (sAddr) abstractDataAttributeDesc.sAddr = sAddr;

  if (valKind && ["Spec", "Conf", "RO", "Set"].includes(valKind))
    abstractDataAttributeDesc.valKind = valKind as
      | "Spec"
      | "RO"
      | "Conf"
      | "Set";

  if (valImport && valImport === "true")
    abstractDataAttributeDesc.valImport = true;

  if (count && /^\d+$/.test(count) && !isNaN(parseInt(count, 10)))
    // count can be an unsigned integer
    abstractDataAttributeDesc.count = parseInt(count, 10);
  else if (count && !isNaN(siblingCount(element, count)))
    // count can be a reference to another sibling that has integer definition
    abstractDataAttributeDesc.count = siblingCount(element, count);

  abstractDataAttributeDesc.vals = Array.from(element.children)
    .filter((child) => child.tagName === "Val")
    .map((val) => describeVal(val))
    .sort(compareBySGroup);

  const referencedType = Array.from(
    element.closest("DataTypeTemplates")?.children ?? [],
  ).find((sibling) => sibling.getAttribute("id") === type);
  if (
    abstractDataAttributeDesc.bType === "Enum" &&
    referencedType &&
    referencedType.tagName === "EnumType"
  )
    abstractDataAttributeDesc.type = EnumType(referencedType);
  else if (
    abstractDataAttributeDesc.bType === "Struct" &&
    referencedType &&
    referencedType.tagName === "DAType"
  )
    abstractDataAttributeDesc.type = DAType(referencedType);

  return abstractDataAttributeDesc;
}
