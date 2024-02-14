import { sortRecord } from "../utils.js";
import { AccessPoint, AccessPointDescription } from "./AccessPoint.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { Services, ServicesDescription } from "./Services.js";

function compareKDCs(a: KDCDescription, b: KDCDescription): number {
  const stringifiedA = JSON.stringify(a);
  const stringifiedB = JSON.stringify(b);

  if (stringifiedA < stringifiedB) return -1;
  if (stringifiedA > stringifiedB) return 1;
  return 0;
}

interface KDCDescription {
  /** IED attribute iedName */
  iedName: string;
  /** IED attribute apName */
  apName: string;
}

export interface IEDDescription extends NamingDescription {
  /** IED attribute type */
  type?: string;
  /** IED attribute manufacturer */
  manufacturer?: string;
  /** IED attribute configVersion */
  configVersion?: string;
  /** IED attribute originalSclVersion defaulting 2003*/
  originalSclVersion: number;
  /** IED attribute originalSclRevision defaulting "A"*/
  originalSclRevision: string;
  /** IED attribute originalSclRelease defaulting 1*/
  originalSclRelease: number;
  /** IED attribute engRight defaulting "full" */
  engRight: string;
  /** IED attribute owner  */
  owner?: string;
  /** IED child Services */
  services?: ServicesDescription;
  /** IED children AccessPoint */
  accessPoints: Record<string, AccessPointDescription>;
  /** IED children KDC */
  kDCs: KDCDescription[];
}

function kdcDescription(element: Element): KDCDescription | undefined {
  const iedName = element.getAttribute("iedName");
  const apName = element.getAttribute("apName");
  if (!iedName || !apName) return;

  return { iedName, apName };
}

function kDCs(parent: Element): KDCDescription[] {
  const kdcDescriptions: KDCDescription[] = [];
  parent.querySelectorAll(":scope > KDC").forEach((kdc) => {
    const kdcDesc = kdcDescription(kdc);
    if (kdcDesc) kdcDescriptions.push(kdcDesc);
  });

  return kdcDescriptions.sort(compareKDCs);
}

function sortedAccessPointDescriptions(
  parent: Element,
): Record<string, AccessPointDescription> | undefined {
  const accessPoints: Record<string, AccessPointDescription> = {};
  let existUndefinedAPs = false;
  Array.from(parent.querySelectorAll(":scope > AccessPoint")).forEach(
    (accessPoint) => {
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
    },
  );
  if (existUndefinedAPs) return;

  return sortRecord(accessPoints) as Record<string, AccessPointDescription>;
}

export function IED(element: Element): IEDDescription | undefined {
  const accessPoints = sortedAccessPointDescriptions(element);
  if (!accessPoints) return;

  const iedDescription: IEDDescription = {
    ...describeNaming(element),
    originalSclVersion: element.getAttribute("originalSclVersion")
      ? parseInt(element.getAttribute("originalSclVersion")!, 10)
      : 2003,
    originalSclRevision: element.getAttribute("originalSclRevision")
      ? element.getAttribute("originalSclRevision")!
      : "A",
    originalSclRelease: element.getAttribute("originalSclRelease")
      ? parseInt(element.getAttribute("originalSclRelease")!, 10)
      : 1,
    engRight: element.getAttribute("engRight")
      ? element.getAttribute("engRight")!
      : "full",
    accessPoints,
    kDCs: kDCs(element),
  };

  const type = element.getAttribute("type");
  if (type) iedDescription.type = type;

  const manufacturer = element.getAttribute("manufacturer");
  if (manufacturer) iedDescription.manufacturer = manufacturer;

  const configVersion = element.getAttribute("configVersion");
  if (configVersion) iedDescription.configVersion = configVersion;

  const owner = element.getAttribute("owner");
  if (owner) iedDescription.owner = owner;

  const servicesElement = element.querySelector(":scope > Services");
  if (servicesElement) iedDescription.services = Services(servicesElement);

  return iedDescription;
}
