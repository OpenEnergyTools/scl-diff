import { sortRecord } from "../utils.js";
import { DODescription, describeDO } from "./DODescription.js";
import { NamingDescription, describeNaming } from "./Naming.js";

export interface LNodeTypeDescription extends NamingDescription {
  /** Required attribute lnClass */
  lnClass: string;
  /** Optional attribute iedType */
  iedType?: string;
  /** Child DO elements. Key is required name attribute of DO child */
  dos: Record<string, DODescription>;
}

export function LNodeType(element: Element): LNodeTypeDescription | undefined {
  const lnClass = element.getAttribute("lnClass");
  if (!lnClass) return undefined;

  const lNodeTypeDescription: LNodeTypeDescription = {
    ...describeNaming(element),
    lnClass,
    dos: {},
  };

  const iedType = element.getAttribute("iedType");
  if (iedType) lNodeTypeDescription.iedType = iedType;

  const unsortedDOs: Record<string, DODescription> = {};
  Array.from(element.children)
    .filter((child) => child.tagName === "DO")
    .forEach((dOs) => {
      const [name, type] = ["name", "type"].map((attr) =>
        dOs.getAttribute(attr)
      );

      if (dOs.tagName === "DO" && name && type) {
        const doDescription = describeDO(dOs);
        if (doDescription) unsortedDOs[name!] = doDescription;
      }
    });

  lNodeTypeDescription.dos = sortRecord(unsortedDOs);

  return lNodeTypeDescription;
}
