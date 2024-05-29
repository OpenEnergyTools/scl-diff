import { describeNaming, NamingDescription } from "./Naming.js";

interface FCDA {
  iedName: string;
  ldInst: string;
  prefix: string;
  lnClass: string;
  lnInst: string;
  doName: string;
  daName?: string;
  fc: string;
}

export interface DataSetDescription extends NamingDescription {
  data: FCDA[];
}

export function describeDataSet(
  element: Element,
): DataSetDescription | undefined {
  const maybeData = Array.from(element.children)
    .filter((child) => child.tagName === "FCDA")
    .map((fcda) => {
      const [iedName, ldInst, prefix, lnClass, lnInst, doName, daName, fc] = [
        "iedName",
        "ldInst",
        "prefix",
        "lnClass",
        "lnInst",
        "doName",
        "daName",
        "fc",
      ].map((attr) => fcda.getAttribute(attr));

      if (!iedName || !ldInst || !lnClass || !doName || !fc) return;

      const fcd = {
        iedName,
        ldInst,
        prefix: prefix ?? "",
        lnClass,
        lnInst: lnInst ?? "",
        doName,
        fc,
      };
      return daName ? { ...fcd, daName } : { ...fcd };
    });

  if (maybeData.some((fcda) => fcda === undefined)) return undefined;

  return { ...describeNaming(element), data: maybeData as FCDA[] };
}
