import { LN0, LN0Description } from "./LN0.js";
import { LN, LNDescription } from "./LN.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { sortRecord } from "../utils.js";

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

  const lns: Record<string, LNDescription> = {};
  let existUndefinedLns = false;
  Array.from(element.children)
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

  if (existUndefinedLns) return;

  const lDeviceDescription: LDeviceDescription = {
    ...describeNaming(element),
    ln0: ln0Description,
    lns: sortRecord(lns) as Record<string, LNDescription>,
  };

  const ldName = element.getAttribute("ldName");
  if (ldName) lDeviceDescription.ldName = ldName;

  const accessControl = element.querySelector(":scope > AccessControl");
  if (accessControl) lDeviceDescription.accessControl = accessControl.outerHTML;

  return lDeviceDescription;
}
