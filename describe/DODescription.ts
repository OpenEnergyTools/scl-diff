import { referencedDataType } from "../utils.js";

import { DOType, DOTypeDescription } from "./DOType.js";
import { NamingDescription, describeNaming } from "./Naming.js";

export interface DODescription extends NamingDescription {
  /** Option attribute accessControl */
  accessControl?: string;
  /** Optional attribute transient defaulting to false */
  transient: boolean;
  /** Required attribute referencing a DOType */
  type: DOTypeDescription;
}

export function describeDO(element: Element): DODescription | undefined {
  const referencedType = referencedDataType(element);
  if (!referencedType || referencedType.tagName !== "DOType") return undefined;

  const type = DOType(referencedType);
  if (!type) return undefined;

  const transient = element.getAttribute("transient") ? true : false;

  const accessControl = element.getAttribute("accessControl");
  if (accessControl)
    return { ...describeNaming(element), accessControl, transient, type };

  return { ...describeNaming(element), transient, type };
}
