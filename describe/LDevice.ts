import { LN0, LN0Description } from "./LN0.js";
import { LNDescription, sortedLNDescriptions } from "./LN.js";
import { NamingDescription, describeNaming } from "./Naming.js";

export interface LDeviceDescription extends NamingDescription {
  /** LDevice attribute ldName */
  ldName?: string;
  /** LDevice child LN0 */
  ln0: LN0Description;
  /** LDevice children LN */
  lns: Record<string, LNDescription>;
  /** LDevice child AccessControl */
  accessControl?: string;
}

export function LDevice(element: Element): LDeviceDescription | undefined {
  const ln0 = element.querySelector(":scope > LN0");
  if (!ln0) return;

  const ln0Description = LN0(ln0);
  if (!ln0Description) return;

  const lns = sortedLNDescriptions(element);
  if (!lns) return;

  const lDeviceDescription: LDeviceDescription = {
    ...describeNaming(element),
    ln0: ln0Description,
    lns,
  };

  const ldName = element.getAttribute("ldName");
  if (ldName) lDeviceDescription.ldName = ldName;

  const accessControl = element.querySelector(":scope > AccessControl");
  if (accessControl) lDeviceDescription.accessControl = accessControl.outerHTML;

  return lDeviceDescription;
}
