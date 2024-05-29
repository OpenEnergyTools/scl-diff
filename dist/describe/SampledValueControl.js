import { describeControlWithIEDName, } from "./ControlWithIEDName.js";
function smvOpts(element) {
    const smvOpts = element.querySelector(":scope > SmvOpts");
    if (!smvOpts)
        return;
    const some = {
        refreshTime: smvOpts.getAttribute("refreshTime") === "true" ? true : false,
        sampleSynchronized: smvOpts.getAttribute("sampleSynchronized") === "false" ? false : true,
        sampleRate: smvOpts.getAttribute("sampleRate") === "true" ? true : false,
        dataSet: smvOpts.getAttribute("dataSet") === "true" ? true : false,
        security: smvOpts.getAttribute("security") === "true" ? true : false,
        timestamp: smvOpts.getAttribute("timestamp") === "true" ? true : false,
        synchSourceId: smvOpts.getAttribute("synchSourceId") === "true" ? true : false,
    };
    return some;
}
export function describeSampledValueControl(element) {
    const controlWithTriggerOptDesc = describeControlWithIEDName(element);
    if (!controlWithTriggerOptDesc)
        return;
    const smpRate = element.getAttribute("smpRate");
    if (!smpRate || isNaN(parseInt(smpRate, 10)))
        return;
    const nofASDU = element.getAttribute("nofASDU");
    if (!nofASDU || isNaN(parseInt(nofASDU, 10)))
        return;
    const SmvOpts = smvOpts(element);
    if (!SmvOpts)
        return;
    const gseControlDescription = {
        ...controlWithTriggerOptDesc,
        multicast: element.getAttribute("multicast") === "false" ? false : true,
        smvID: element.getAttribute("smvID") ?? "",
        smpRate: parseInt(smpRate, 10),
        nofASDU: parseInt(nofASDU, 10),
        smpMod: element.getAttribute("smpMod")
            ? element.getAttribute("smpMod")
            : "SmpPerPeriod",
        securityEnable: element.getAttribute("securityEnable")
            ? element.getAttribute("securityEnable")
            : "None",
        SmvOpts: SmvOpts,
    };
    const protocol = Array.from(element.children).find((child) => child.tagName === "Protocol");
    if (protocol)
        gseControlDescription.protocol = { mustUnderstand: true, val: "R-SV" };
    return gseControlDescription;
}
//# sourceMappingURL=SampledValueControl.js.map