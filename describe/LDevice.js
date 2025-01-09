import { LN0 } from "./LN0.js";
import { sortedLNDescriptions } from "./LN.js";
import { describeNaming } from "./Naming.js";
export function LDevice(element) {
    const ln0 = element.querySelector(":scope > LN0");
    if (!ln0)
        return;
    const ln0Description = LN0(ln0);
    if (!ln0Description)
        return;
    const lns = sortedLNDescriptions(element);
    if (!lns)
        return;
    const lDeviceDescription = {
        ...describeNaming(element),
        ln0: ln0Description,
        lns,
    };
    const ldName = element.getAttribute("ldName");
    if (ldName)
        lDeviceDescription.ldName = ldName;
    const accessControl = element.querySelector(":scope > AccessControl");
    if (accessControl)
        lDeviceDescription.accessControl = accessControl.outerHTML;
    return lDeviceDescription;
}
//# sourceMappingURL=LDevice.js.map