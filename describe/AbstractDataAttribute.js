import { DAType } from "./DAType.js";
import { EnumType } from "./EnumType.js";
import { describeNaming } from "./Naming.js";
import { describeVal, compareBySGroup } from "./Val.js";
export function isAbstractDataAttributeDescription(
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type) {
    return ("bType" in type &&
        "count" in type &&
        "valImport" in type &&
        "vals" in type &&
        "valKind" in type);
}
/** Get count from referenced sibling element */
function siblingCount(element, name) {
    const parent = element.parentElement;
    if (!parent)
        return NaN;
    const sibling = Array.from(parent.children).find((child) => child.getAttribute("name") === name);
    if (!sibling)
        return NaN;
    const count = sibling.getAttribute("count");
    if (!count)
        return NaN;
    if (!/^\d+$/.test(count))
        return NaN;
    return parseInt(count, 10);
}
export function describeDAorSDAorDAI(element) {
    const abstractDataAttributeDesc = {
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
    if (sAddr)
        abstractDataAttributeDesc.sAddr = sAddr;
    if (valKind && ["Spec", "Conf", "RO", "Set"].includes(valKind))
        abstractDataAttributeDesc.valKind = valKind;
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
    const referencedType = Array.from(element.closest("DataTypeTemplates")?.children ?? []).find((sibling) => sibling.getAttribute("id") === type);
    if (abstractDataAttributeDesc.bType === "Enum" &&
        referencedType &&
        referencedType.tagName === "EnumType")
        abstractDataAttributeDesc.type = EnumType(referencedType);
    else if (abstractDataAttributeDesc.bType === "Struct" &&
        referencedType &&
        referencedType.tagName === "DAType")
        abstractDataAttributeDesc.type = DAType(referencedType);
    return abstractDataAttributeDesc;
}
//# sourceMappingURL=AbstractDataAttribute.js.map