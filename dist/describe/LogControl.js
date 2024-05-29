import { describeControlWithTriggerOpt, } from "./ControlWithTriggerOpt.js";
export function describeLogControl(element) {
    const controlWithTriggerOptDesc = describeControlWithTriggerOpt(element);
    if (!controlWithTriggerOptDesc)
        return;
    const logName = element.getAttribute("logName");
    if (!logName)
        return;
    const logControlDescription = {
        ...controlWithTriggerOptDesc,
        ldInst: element.getAttribute("ldInst"),
        prefix: element.getAttribute("prefix") ?? "",
        lnClass: element.getAttribute("lnClass") ?? "LLN0",
        lnInst: element.getAttribute("lnInst"),
        logEna: element.getAttribute("logEna") === "false" ? false : true,
        reasonCode: element.getAttribute("reasonCode") === "false" ? false : true,
        bufTime: 0,
        logName,
    };
    const bufTime = element.getAttribute("bufTime");
    if (bufTime && !isNaN(parseInt(bufTime, 10)))
        logControlDescription.bufTime = parseInt(bufTime, 10);
    return logControlDescription;
}
//# sourceMappingURL=LogControl.js.map