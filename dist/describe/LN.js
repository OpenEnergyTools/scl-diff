import { sortRecord } from "../utils.js";
import { isDOTypeDescription } from "./DOType.js";
import { LNodeType, isLNodeTypeDescription, } from "./LNodeType.js";
import { describeLogControl } from "./LogControl.js";
import { describeNaming } from "./Naming.js";
import { describeInputs } from "./Inputs.js";
import { describeReportControl, } from "./ReportControl.js";
import { describeVal, compareBySGroup } from "./Val.js";
export function sortedLNDescriptions(parent) {
    const lns = {};
    let existUndefinedLns = false;
    Array.from(parent.children)
        .filter((child) => child.tagName === "LN")
        .forEach((ln) => {
        const prefix = ln.getAttribute("prefix");
        const lnClass = ln.getAttribute("lnClass");
        const inst = ln.getAttribute("inst");
        if (!lnClass || !inst) {
            existUndefinedLns = true;
            return;
        }
        const id = `${prefix ? prefix : ""}${lnClass}${inst}`;
        const lnDescription = LN(ln);
        if (!lnDescription) {
            existUndefinedLns = true;
            return;
        }
        lns[id] = lnDescription;
    });
    if (existUndefinedLns)
        return;
    return sortRecord(lns);
}
function reportControls(element) {
    const unsortedReports = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "ReportControl")
        .forEach((reportControl) => {
        const name = reportControl.getAttribute("name");
        const reportDescription = describeReportControl(reportControl);
        if (name && !unsortedReports[name] && reportDescription)
            unsortedReports[name] = reportDescription;
    });
    return sortRecord(unsortedReports);
}
function getNextDataType(dataType, path, index = 0) {
    if (isLNodeTypeDescription(dataType))
        if (dataType.dos[path[index]]?.type)
            return getNextDataType(dataType.dos[path[index]].type, path, ++index);
        else
            return;
    else if (isDOTypeDescription(dataType))
        if (dataType.sdos[path[index]])
            return getNextDataType(dataType.sdos[path[index]].type, path, ++index);
        else if (dataType.das[path[index]]?.bType === "Struct")
            return getNextDataType(dataType.das[path[index]].type, path, ++index);
        else
            return dataType.das[path[index]];
    else if (dataType.bdas[path[index]].bType === "Struct")
        return getNextDataType(dataType.bdas[path[index]].type, path, ++index);
    else
        return dataType.bdas[path[index]];
}
function logControls(element) {
    const unsortedLogControls = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "LogControl")
        .forEach((logControl) => {
        const name = logControl.getAttribute("name");
        const logControlDescription = describeLogControl(logControl);
        if (name && !unsortedLogControls[name] && logControlDescription)
            unsortedLogControls[name] = logControlDescription;
    });
    return sortRecord(unsortedLogControls);
}
function logs(element) {
    const unsortedLogs = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "Log")
        .forEach((log) => {
        const name = log.getAttribute("name");
        const logDescription = describeNaming(log);
        if (name && !unsortedLogs[name] && logDescription)
            unsortedLogs[name] = logDescription;
    });
    return sortRecord(unsortedLogs);
}
/** Returns leaf data attribute (BDA or DA) from
 * LNodeTypeDescription containing vals
 * @param path - parent DOI/SDI/DAI name attributes
 * @param lNodeType - LNodeTypeDescription of the logical node
 * */
function getLeafDataAttribute(path, lNodeType) {
    return getNextDataType(lNodeType, path, 0);
}
function updateValues(lNodeType, instanceValues) {
    Object.entries(instanceValues).forEach(([key, value]) => {
        const leafDataAttribute = getLeafDataAttribute(key.split("."), lNodeType);
        if (leafDataAttribute)
            leafDataAttribute.vals = value
                .map((val) => describeVal(val))
                .sort(compareBySGroup);
    });
    return lNodeType;
}
/** Path consisting of parents name attributes: e.g. ["Beh","stVal"] */
function pathToInstanceValue(element) {
    if (element.tagName === "LN" || element.tagName === "LN0")
        return [];
    const parent = element.parentElement;
    if (element.tagName === "Val")
        return pathToInstanceValue(parent);
    const parentPath = pathToInstanceValue(parent);
    const name = element.getAttribute("name");
    return parentPath && name ? [...parentPath, name] : undefined;
}
function instanceValues(ln) {
    const vals = ln.querySelectorAll("Val");
    const instanceValues = {};
    vals.forEach((valElement) => {
        const path = pathToInstanceValue(valElement)?.join(".");
        if (path && instanceValues[path])
            instanceValues[path].push(valElement);
        if (path && !instanceValues[path])
            instanceValues[path] = [valElement];
    });
    return instanceValues;
}
export function LN(element) {
    const lNodeType = element.ownerDocument.querySelector(`DataTypeTemplates > LNodeType[id="${element.getAttribute("lnType")}"]`);
    if (!lNodeType)
        return;
    const lNodeTypeDescriptions = LNodeType(lNodeType);
    if (!lNodeTypeDescriptions)
        return;
    const lnType = updateValues(lNodeTypeDescriptions, instanceValues(element));
    const lnDescription = {
        ...describeNaming(element),
        reports: reportControls(element),
        logControls: logControls(element),
        logs: logs(element),
        lnType,
    };
    const inputs = Array.from(element.children).find((child) => child.tagName === "Inputs");
    if (inputs)
        lnDescription.inputs = describeInputs(inputs);
    return lnDescription;
}
//# sourceMappingURL=LN.js.map