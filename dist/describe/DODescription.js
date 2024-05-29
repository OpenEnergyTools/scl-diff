import { referencedDataType } from "../utils.js";
import { DOType } from "./DOType.js";
import { describeNaming } from "./Naming.js";
export function describeDO(element) {
    const referencedType = referencedDataType(element);
    if (!referencedType || referencedType.tagName !== "DOType")
        return undefined;
    const type = DOType(referencedType);
    if (!type)
        return undefined;
    const transient = element.getAttribute("transient") ? true : false;
    const accessControl = element.getAttribute("accessControl");
    if (accessControl)
        return { ...describeNaming(element), accessControl, transient, type };
    return { ...describeNaming(element), transient, type };
}
//# sourceMappingURL=DODescription.js.map