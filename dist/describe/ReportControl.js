import { describeControlWithTriggerOpt, } from "./ControlWithTriggerOpt.js";
function clients(element) {
    const rptEnabled = Array.from(element.children).find((child) => child.tagName === "RptEnabled");
    if (!rptEnabled)
        return { maxClients: 0, clients: [] };
    const clients = Array.from(rptEnabled.children)
        .filter((child) => child.tagName === "ClientLN")
        .map((clientLn) => {
        const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = [
            "iedName",
            "apRef",
            "ldInst",
            "prefix",
            "lnClass",
            "lnInst",
        ].map((attr) => clientLn.getAttribute(attr));
        if (!iedName || !ldInst || !lnClass)
            return undefined;
        const lnGroup = {
            iedName,
            ldInst,
            prefix: prefix ?? "",
            lnClass,
            lnInst: lnInst ?? "",
        };
        if (!apRef)
            return lnGroup;
        return { ...lnGroup, apRef };
    })
        .filter((clientLn) => clientLn);
    return { maxClients: 0, clients };
}
function optFields(element) {
    const optFields = Array.from(element.children).find((child) => child.tagName === "OptFields");
    if (!optFields)
        return {
            seqNum: false,
            timeStamp: false,
            dataSet: false,
            reasonCode: false,
            dataRef: false,
            entryID: false,
            configRef: false,
            bufOvfl: false,
        };
    const [seqNum, timeStamp, dataSet, reasonCode, dataRef, entryID, configRef, bufOvfl,] = [
        "seqNum",
        "timeStamp",
        "dataSet",
        "reasonCode",
        "dataRef",
        "entryID",
        "configRef",
        "bufOvfl",
    ].map((attr) => (element.getAttribute(attr) ? true : false));
    return {
        seqNum,
        timeStamp,
        dataSet,
        reasonCode,
        dataRef,
        entryID,
        configRef,
        bufOvfl,
    };
}
export function describeReportControl(element) {
    const controlWithTriggerOptDesc = describeControlWithTriggerOpt(element);
    if (!controlWithTriggerOptDesc)
        return;
    const reportControlDescription = {
        ...controlWithTriggerOptDesc,
        indexed: element.getAttribute("indexed") === "false" ? false : true,
        bufTime: 0,
        buffered: element.getAttribute("buffered") === "false" ? false : true,
        confRev: 0,
        optFields: optFields(element),
        ...clients(element),
    };
    const bufTime = element.getAttribute("bufTime");
    if (bufTime && !isNaN(parseInt(bufTime, 10)))
        reportControlDescription.bufTime = parseInt(bufTime, 10);
    const confRev = element.getAttribute("confRev");
    if (confRev && !isNaN(parseInt(confRev, 10)))
        reportControlDescription.confRev = parseInt(confRev, 10);
    return reportControlDescription;
}
//# sourceMappingURL=ReportControl.js.map