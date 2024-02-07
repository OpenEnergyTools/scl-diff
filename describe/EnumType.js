import { describeNaming } from "./Naming.js";
export function isEnumTypeDescription(type) {
    return "enumVals" in type;
}
export function EnumType(element) {
    const enumTypeDesc = {
        ...describeNaming(element),
        enumVals: {},
    };
    Array.from(element.getElementsByTagName("EnumVal")).forEach((enumVal) => {
        const ordAttr = enumVal.getAttribute("ord");
        if (!ordAttr)
            return;
        const ord = parseInt(ordAttr, 10);
        if (isNaN(ord))
            return;
        enumTypeDesc.enumVals[ord] = {
            desc: enumVal.getAttribute("desc") ?? "",
            content: enumVal.textContent || "",
        };
    });
    return enumTypeDesc;
}
//# sourceMappingURL=EnumType.js.map