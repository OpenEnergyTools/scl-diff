import { sortRecord } from "../utils.js";
import { AccessPoint } from "./AccessPoint.js";
import { describeNaming } from "./Naming.js";
import { Services } from "./Services.js";
function compareKDCs(a, b) {
    const stringifiedA = JSON.stringify(a);
    const stringifiedB = JSON.stringify(b);
    if (stringifiedA < stringifiedB)
        return -1;
    if (stringifiedA > stringifiedB)
        return 1;
    return 0;
}
function kdcDescription(element) {
    const iedName = element.getAttribute("iedName");
    const apName = element.getAttribute("apName");
    if (!iedName || !apName)
        return;
    return { iedName, apName };
}
function kDCs(parent) {
    const kdcDescriptions = [];
    parent.querySelectorAll(":scope > KDC").forEach((kdc) => {
        const kdcDesc = kdcDescription(kdc);
        if (kdcDesc)
            kdcDescriptions.push(kdcDesc);
    });
    return kdcDescriptions.sort(compareKDCs);
}
function sortedAccessPointDescriptions(parent) {
    const accessPoints = {};
    let existUndefinedAPs = false;
    Array.from(parent.querySelectorAll(":scope > AccessPoint")).forEach((accessPoint) => {
        const name = accessPoint.getAttribute("name");
        if (!name) {
            existUndefinedAPs = true;
            return;
        }
        const accessPointDescription = AccessPoint(accessPoint);
        if (!accessPointDescription) {
            existUndefinedAPs = true;
            return;
        }
        accessPoints[name] = accessPointDescription;
    });
    if (existUndefinedAPs)
        return;
    return sortRecord(accessPoints);
}
export function IED(element) {
    const accessPoints = sortedAccessPointDescriptions(element);
    if (!accessPoints)
        return;
    const iedDescription = {
        ...describeNaming(element),
        originalSclVersion: element.getAttribute("originalSclVersion")
            ? parseInt(element.getAttribute("originalSclVersion"), 10)
            : 2003,
        originalSclRevision: element.getAttribute("originalSclRevision")
            ? element.getAttribute("originalSclRevision")
            : "A",
        originalSclRelease: element.getAttribute("originalSclRelease")
            ? parseInt(element.getAttribute("originalSclRelease"), 10)
            : 1,
        engRight: element.getAttribute("engRight")
            ? element.getAttribute("engRight")
            : "full",
        accessPoints,
        kDCs: kDCs(element),
    };
    const type = element.getAttribute("type");
    if (type)
        iedDescription.type = type;
    const manufacturer = element.getAttribute("manufacturer");
    if (manufacturer)
        iedDescription.manufacturer = manufacturer;
    const configVersion = element.getAttribute("configVersion");
    if (configVersion)
        iedDescription.configVersion = configVersion;
    const owner = element.getAttribute("owner");
    if (owner)
        iedDescription.owner = owner;
    const servicesElement = element.querySelector(":scope > Services");
    if (servicesElement)
        iedDescription.services = Services(servicesElement);
    return iedDescription;
}
//# sourceMappingURL=IED.js.map