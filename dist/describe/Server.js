import { sortRecord } from "../utils.js";
import { LDevice } from "./LDevice.js";
import { describeNaming } from "./Naming.js";
function compareAssociations(a, b) {
    const stringifiedA = JSON.stringify(a);
    const stringifiedB = JSON.stringify(b);
    if (stringifiedA < stringifiedB)
        return -1;
    if (stringifiedA > stringifiedB)
        return 1;
    return 0;
}
function associations(element) {
    const associations = [];
    Array.from(element.children)
        .filter((child) => child.tagName === "Association")
        .forEach((assoc) => {
        const kind = assoc.getAttribute("kind");
        const associationId = assoc.getAttribute("associationId");
        const iedName = assoc.getAttribute("iedName");
        const ldInst = assoc.getAttribute("ldInst");
        const desc = assoc.getAttribute("desc") ?? "";
        const prefix = assoc.getAttribute("prefix") ?? "";
        const lnClass = assoc.getAttribute("lnClass");
        const lnInst = assoc.getAttribute("lnInst");
        if (!kind ||
            !["pre-established", "predefined"].includes(kind) ||
            !iedName ||
            !ldInst ||
            !lnClass ||
            lnInst === null)
            return;
        const association = {
            kind: kind,
            desc,
            iedName,
            ldInst,
            prefix,
            lnClass,
            lnInst,
        };
        if (associationId)
            association.associationId = associationId;
        associations.push(association);
    });
    return associations.sort(compareAssociations);
}
function authentication(element) {
    return {
        none: element.getAttribute("none") === "false" ? false : true,
        password: element.getAttribute("password") === "true" ? true : false,
        weak: element.getAttribute("weak") === "true" ? true : false,
        strong: element.getAttribute("strong") === "true" ? true : false,
        certificate: element.getAttribute("certificate") === "true" ? true : false,
    };
}
function lDevices(element) {
    const unsortedLDevices = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "LDevice")
        .forEach((lDevice) => {
        const inst = lDevice.getAttribute("inst");
        const lDeviceDescription = LDevice(lDevice);
        if (inst && !unsortedLDevices[inst] && lDeviceDescription)
            unsortedLDevices[inst] = lDeviceDescription;
    });
    return sortRecord(unsortedLDevices);
}
export function Server(element) {
    const auth = element.querySelector(":scope > Authentication");
    if (!auth)
        return;
    const serverDescription = {
        ...describeNaming(element),
        timeout: parseInt(element.getAttribute("timeout") ?? "30", 10),
        lDevices: lDevices(element),
        authentication: authentication(auth),
        associations: associations(element),
    };
    return serverDescription;
}
//# sourceMappingURL=Server.js.map