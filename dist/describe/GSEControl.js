import { describeControlWithIEDName, } from "./ControlWithIEDName.js";
export function describeGSEControl(element) {
    const controlWithTriggerOptDesc = describeControlWithIEDName(element);
    if (!controlWithTriggerOptDesc)
        return;
    const gseControlDescription = {
        ...controlWithTriggerOptDesc,
        type: element.getAttribute("type") === "GSSE" ? "GSSE" : "GOOSE",
        appID: element.getAttribute("appID") ?? "",
        fixedOffs: element.getAttribute("fixedOffs") === "true" ? true : false,
        securityEnable: element.getAttribute("securityEnable")
            ? element.getAttribute("securityEnable")
            : "None",
    };
    const protocol = Array.from(element.children).find((child) => child.tagName === "Protocol");
    if (protocol)
        gseControlDescription.protocol = { mustUnderstand: true, val: "R-GOOSE" };
    return gseControlDescription;
}
//# sourceMappingURL=GSEControl.js.map