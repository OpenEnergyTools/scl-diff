import { sortRecord } from "../utils.js";
import { sortedLNDescriptions } from "./LN.js";
import { describeNaming } from "./Naming.js";
import { Server } from "./Server.js";
import { Services } from "./Services.js";
function describeServerAt(element) {
    const apName = element.getAttribute("apName");
    if (!apName)
        return;
    return { ...describeNaming(element), apName };
}
function describeCert(element) {
    const commonName = element.getAttribute("commonName");
    if (!commonName)
        return;
    const idHierarchy = element.getAttribute("idHierarchy");
    if (!idHierarchy)
        return;
    return { commonName, idHierarchy };
}
function describeCertificate(element) {
    const serialNumber = element.getAttribute("serialNumber");
    if (!serialNumber)
        return;
    const subjectElement = element.querySelector(":scope > Subject");
    if (!subjectElement)
        return;
    const subject = describeCert(subjectElement);
    if (!subject)
        return;
    const issuerNameElement = element.querySelector(":scope > IssuerName");
    if (!issuerNameElement)
        return;
    const issuerName = describeCert(issuerNameElement);
    if (!issuerName)
        return;
    const certificate = {
        ...describeNaming(element),
        serialNumber: parseInt(serialNumber, 10),
        subject,
        issuerName,
    };
    return certificate;
}
function certificates(element, type) {
    const certificates = {};
    element.querySelectorAll(`:scope > ${type}`).forEach((certificate) => {
        const name = certificate.getAttribute("name");
        const certificateDescription = describeCertificate(certificate);
        if (name && certificateDescription)
            certificates[name] = certificateDescription;
    });
    return sortRecord(certificates);
}
export function AccessPoint(element) {
    const lns = sortedLNDescriptions(element);
    if (!lns)
        return;
    const accessPointDescription = {
        ...describeNaming(element),
        router: element.getAttribute("router") === "true" ? true : false,
        clock: element.getAttribute("clock") === "true" ? true : false,
        kdc: element.getAttribute("kdc") === "true" ? true : false,
        lns,
        gooseSecurities: certificates(element, "GOOSESecurity"),
        smvSecurities: certificates(element, "SMVSecurity"),
    };
    const servicesElement = element.querySelector(":scope > Services");
    if (servicesElement)
        accessPointDescription.services = Services(servicesElement);
    const serverElement = element.querySelector(":scope > Server");
    if (serverElement) {
        const server = Server(serverElement);
        if (server)
            accessPointDescription.server = server;
        else
            return;
    }
    const serverAtElement = element.querySelector(":scope > ServerAt");
    if (serverAtElement) {
        const serverAt = describeServerAt(serverAtElement);
        if (serverAt)
            accessPointDescription.serverAt = serverAt;
        else
            return;
    }
    return accessPointDescription;
}
//# sourceMappingURL=AccessPoint.js.map