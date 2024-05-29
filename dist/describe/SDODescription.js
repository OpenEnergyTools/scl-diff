import { DOType } from "./DOType.js";
import { describeNaming } from "./Naming.js";
export function describeSDO(element) {
    const referencedType = Array.from(element.closest("DataTypeTemplates")?.children ?? []).find((sibling) => sibling.getAttribute("id") === element.getAttribute("type"));
    if (!referencedType || referencedType.tagName !== "DOType")
        return undefined;
    const type = DOType(referencedType);
    if (!type)
        return undefined;
    return { ...describeNaming(element), type };
}
//# sourceMappingURL=SDODescription.js.map