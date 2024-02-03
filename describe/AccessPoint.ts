import { sortRecord } from "../utils.js";
import { LNDescription, sortedLNDescriptions } from "./LN.js";
import { describeNaming, NamingDescription } from "./Naming.js";
import { Server, ServerDescription } from "./Server.js";
import { Services, ServicesDescription } from "./Services.js";

interface Cert {
  /** Cert attribute commonName */
  commonName: string;
  /** Cert attribute idHierarchy */
  idHierarchy: string;
}

export interface Certificate extends NamingDescription {
  /** Certificate attribute serialNumber */
  serialNumber: number;
  /** Certificate attribute xferNumber */
  xferNumber?: number;
  /** Certificate child Subject */
  subject: Cert;
  /** Certificate child IssuerName */
  issuerName: Cert;
}

interface ServerAtDescription extends NamingDescription {
  /** ServerAt attribute apName */
  apName: string;
}

export interface AccessPointDescription extends NamingDescription {
  /** AccessPoint attribute router defaulted false */
  router: boolean;
  /** AccessPoint attribute clock defaulted false */
  clock: boolean;
  /** AccessPoint attribute kdc defaulted false */
  kdc: boolean;
  /** AccessPoint child Services */
  services?: ServicesDescription;
  /** AccessPoint child Server */
  server?: ServerDescription;
  /** AccessPoint children ServerAt */
  serverAt?: ServerAtDescription;
  /** AccessPoint children LN */
  lns: Record<string, LNDescription>;
  /** AccessPoint children GOOSESecurity */
  gooseSecurities: Record<string, Certificate>;
  /** AccessPoint children SMVSecurity */
  smvSecurities: Record<string, Certificate>;
}

function describeServerAt(element: Element): ServerAtDescription | undefined {
  const apName = element.getAttribute("apName");
  if (!apName) return;

  return { ...describeNaming(element), apName };
}

function describeCert(element: Element): Cert | undefined {
  const commonName = element.getAttribute("commonName");
  if (!commonName) return;

  const idHierarchy = element.getAttribute("idHierarchy");
  if (!idHierarchy) return;

  return { commonName, idHierarchy };
}

function describeCertificate(element: Element): Certificate | undefined {
  const serialNumber = element.getAttribute("serialNumber");
  if (!serialNumber) return;

  const subjectElement = element.querySelector(":scope > Subject");
  if (!subjectElement) return;
  const subject = describeCert(subjectElement);
  if (!subject) return;

  const issuerNameElement = element.querySelector(":scope > IssuerName");
  if (!issuerNameElement) return;
  const issuerName = describeCert(issuerNameElement);
  if (!issuerName) return;

  const certificate: Certificate = {
    ...describeNaming(element),
    serialNumber: parseInt(serialNumber, 10),
    subject,
    issuerName,
  };

  return certificate;
}

function certificates(
  element: Element,
  type: "GOOSESecurity" | "SMVSecurity",
): Record<string, Certificate> {
  const certificates: Record<string, Certificate> = {};

  element.querySelectorAll(`:scope > ${type}`).forEach((certificate) => {
    const name = certificate.getAttribute("name");
    const certificateDescription = describeCertificate(certificate);
    if (name && certificateDescription)
      certificates[name] = certificateDescription;
  });

  return sortRecord(certificates) as Record<string, Certificate>;
}

export function AccessPoint(
  element: Element,
): AccessPointDescription | undefined {
  const lns = sortedLNDescriptions(element);
  if (!lns) return;

  const accessPointDescription: AccessPointDescription = {
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
    if (server) accessPointDescription.server = server;
    else return;
  }

  const serverAtElement = element.querySelector(":scope > ServerAt");
  if (serverAtElement) {
    const serverAt = describeServerAt(serverAtElement);
    if (serverAt) accessPointDescription.serverAt = serverAt;
    else return;
  }

  return accessPointDescription;
}
