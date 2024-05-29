import { sortRecord } from "../utils.js";
import { describeDO } from "./DODescription.js";
import { describeNaming } from "./Naming.js";
export function isLNodeTypeDescription(
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type) {
    return "lnClass" in type && "dos" in type;
}
export function LNodeType(element) {
    const lnClass = element.getAttribute("lnClass");
    if (!lnClass)
        return undefined;
    const lNodeTypeDescription = {
        ...describeNaming(element),
        lnClass,
        dos: {},
    };
    const iedType = element.getAttribute("iedType");
    if (iedType)
        lNodeTypeDescription.iedType = iedType;
    const unsortedDOs = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "DO")
        .forEach((dOs) => {
        const [name, type] = ["name", "type"].map((attr) => dOs.getAttribute(attr));
        if (dOs.tagName === "DO" && name && type) {
            const doDescription = describeDO(dOs);
            if (doDescription)
                unsortedDOs[name] = doDescription;
        }
    });
    lNodeTypeDescription.dos = sortRecord(unsortedDOs);
    return lNodeTypeDescription;
}
//# sourceMappingURL=LNodeType.js.map