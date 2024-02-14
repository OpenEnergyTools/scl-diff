import { sortRecord } from "../utils.js";
import { LDevice, LDeviceDescription } from "./LDevice.js";
import { NamingDescription, describeNaming } from "./Naming.js";

function compareAssociations(a: Association, b: Association): number {
  const stringifiedA = JSON.stringify(a);
  const stringifiedB = JSON.stringify(b);

  if (stringifiedA < stringifiedB) return -1;
  if (stringifiedA > stringifiedB) return 1;
  return 0;
}

interface Authentication {
  /** Authentication attribute none defaulted to true */
  none: boolean;
  /** Authentication attribute password defaulted to false */
  password: boolean;
  /** Authentication attribute weak defaulted to false */
  weak: boolean;
  /** Authentication attribute strong defaulted to false */
  strong: boolean;
  /** Authentication attribute certificate defaulted to false */
  certificate: boolean;
}

interface Association {
  desc?: string;
  iedName: string;
  ldInst: string;
  /** Association attribute prefix defaulted to empty string */
  prefix: string;
  /** Association attribute lnClass */
  lnClass: string;
  /** Association attribute lnInst */
  lnInst: string;
  /** Association attribute kind */
  kind: "pre-established" | "predefined";
  /** Association attribute associationId */
  associationId?: string;
}

export interface ServerDescription extends NamingDescription {
  /** Server attribute timeout defaulted to 30 */
  timeout: number;
  /** Server child Authentication */
  authentication: Authentication;
  /** Server children LDevice */
  lDevices: Record<string, LDeviceDescription>;
  /** Server children Association */
  associations: Association[];
}

function associations(element: Element): Association[] {
  const associations: Association[] = [];
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

      if (
        !kind ||
        !["pre-established", "predefined"].includes(kind) ||
        !iedName ||
        !ldInst ||
        !lnClass ||
        lnInst === null
      )
        return;

      const association: Association = {
        kind: kind as "pre-established" | "predefined",
        desc,
        iedName,
        ldInst,
        prefix,
        lnClass,
        lnInst,
      };
      if (associationId) association.associationId = associationId;

      associations.push(association);
    });

  return associations.sort(compareAssociations);
}

function authentication(element: Element): Authentication {
  return {
    none: element.getAttribute("none") === "false" ? false : true,
    password: element.getAttribute("password") === "true" ? true : false,
    weak: element.getAttribute("weak") === "true" ? true : false,
    strong: element.getAttribute("strong") === "true" ? true : false,
    certificate: element.getAttribute("certificate") === "true" ? true : false,
  };
}

function lDevices(element: Element): Record<string, LDeviceDescription> {
  const unsortedLDevices: Record<string, LDeviceDescription> = {};
  Array.from(element.children)
    .filter((child) => child.tagName === "LDevice")
    .forEach((lDevice) => {
      const inst = lDevice.getAttribute("inst");
      const lDeviceDescription = LDevice(lDevice);
      if (inst && !unsortedLDevices[inst] && lDeviceDescription)
        unsortedLDevices[inst] = lDeviceDescription;
    });

  return sortRecord(unsortedLDevices) as Record<string, LDeviceDescription>;
}

export function Server(element: Element): ServerDescription | undefined {
  const auth = element.querySelector(":scope > Authentication");
  if (!auth) return;

  const serverDescription: ServerDescription = {
    ...describeNaming(element),
    timeout: parseInt(element.getAttribute("timeout") ?? "30", 10),
    lDevices: lDevices(element),
    authentication: authentication(auth),
    associations: associations(element),
  };

  return serverDescription;
}
