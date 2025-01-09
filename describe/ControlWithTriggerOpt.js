import { describeControl } from "./Control.js";
function trgOps(element) {
    const trgOps = Array.from(element.children).find((child) => child.tagName === "TrgOps");
    if (!trgOps)
        return { dchg: false, qchg: false, dupd: false, period: false, gi: false };
    const [dchg, qchg, dupd, period, gi] = [
        "dchg",
        "qchg",
        "dupd",
        "period",
        "gi",
    ].map((attr) => (trgOps.getAttribute(attr) === "true" ? true : false));
    return { dchg, qchg, dupd, period, gi };
}
export function describeControlWithTriggerOpt(element) {
    const controlDescription = describeControl(element);
    if (!controlDescription)
        return;
    const controlWithTriggerOptDesc = {
        ...controlDescription,
        trgOps: trgOps(element),
        intgPd: 0,
    };
    const intgPd = element.getAttribute("intgPd");
    if (intgPd && !isNaN(parseInt(intgPd, 10)))
        controlWithTriggerOptDesc.intgPd = parseInt(intgPd, 10);
    return controlWithTriggerOptDesc;
}
//# sourceMappingURL=ControlWithTriggerOpt.js.map