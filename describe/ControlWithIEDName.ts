import { ControlDescription, describeControl } from "./Control.js";

function compareIEDNameDescription(a: IEDName, b: IEDName): number {
  const stringifiedA = JSON.stringify(a);
  const stringifiedB = JSON.stringify(b);

  if (stringifiedA < stringifiedB) return -1;
  if (stringifiedA > stringifiedB) return 1;
  return 0;
}

interface IEDName {
  /** IEDName attribute apRef*/
  apRef?: string;
  /** IEDName attribute ldInst*/
  ldInst?: string;
  /** IEDName attribute prefix*/
  prefix?: string;
  /** IEDName attribute lnClass*/
  lnClass?: string;
  /** IEDName attribute lnInst*/
  lnInst?: string;
  /** IEDName child text content */
  val?: string;
}

function describeIEDName(element: Element): IEDName {
  const iedName: IEDName = {};

  const [apRef, ldInst, prefix, lnClass, lnInst] = [
    "apRef",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
  ].map((attr) => element.getAttribute(attr));

  const val = element.textContent;

  if (apRef) iedName.apRef = apRef;
  if (ldInst) iedName.ldInst = ldInst;
  if (prefix) iedName.prefix = prefix;
  if (lnClass) iedName.lnClass = lnClass;
  if (lnInst) iedName.lnInst = lnInst;
  if (val) iedName.val = val;

  return iedName;
}

export interface ControlWithIEDNameDescription extends ControlDescription {
  /** ControlWithIEDName children IEDName */
  iedNames: IEDName[];
  /** ControlWithIEDName attribute confRev defaulted to 0 */
  confRev?: number;
}

export function describeControlWithIEDName(
  element: Element,
): ControlWithIEDNameDescription | undefined {
  const controlDescription = describeControl(element);
  if (!controlDescription) return;

  const controlWithIEDNameDescription: ControlWithIEDNameDescription = {
    ...controlDescription,
    iedNames: [],
  };

  controlWithIEDNameDescription.iedNames.push(
    ...Array.from(element.children)
      .filter((child) => child.tagName === "IEDName")
      .map((iedName) => describeIEDName(iedName))
      .sort(compareIEDNameDescription),
  );

  const confRev = element.getAttribute("confRev");
  if (confRev && !isNaN(parseInt(confRev, 10)))
    controlWithIEDNameDescription.confRev = parseInt(confRev, 10);

  return controlWithIEDNameDescription;
}
