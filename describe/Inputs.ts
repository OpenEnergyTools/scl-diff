import { NamingDescription, describeNaming } from "./Naming.js";

function compareExtRefDescription(
  a: ExtRefDescription,
  b: ExtRefDescription,
): number {
  const stringifiedA = JSON.stringify(a);
  const stringifiedB = JSON.stringify(b);

  if (stringifiedA < stringifiedB) return -1;
  if (stringifiedA > stringifiedB) return 1;
  return 0;
}

interface ExtRefDescription {
  /** Source IED name attribute */
  iedName?: string;
  /** Source LDevice inst attribute */
  ldInst?: string;
  /** Source AnyLn prefix attribute */
  prefix?: string;
  /** Source AnyLn lnClass attribute */
  lnClass?: string;
  /** Source AnyLn lnInst attribute */
  lnInst?: string;
  /** Source data object(s) */
  doName?: string;
  /** Source data attributes(s) */
  daName?: string;
  /** ExtRef attribute instAddr attribute */
  intAddr?: string;
  /** Source control block name attribute */
  srcCBName?: string;
  /** Source control block parent LDevice inst attribute */
  srcLDInst?: string;
  /** Source control block parent AnyLn prefix attribute */
  srcPrefix?: string;
  /** Source control block parent AnyLn lnInst attribute */
  srcLNClass?: string;
  /** Source control block parent AnyLn inst attribute */
  srcLNInst?: string;
  /** Source control block type */
  serviceType?: "GOOSE" | "Report" | "SMV" | "Poll";
  /** Restriction logical node class */
  pLN?: string;
  /** Restriction data object name(s) */
  pDO?: string;
  /** Restriction data attribute name(s) */
  pDA?: string;
  /** Restriction control block type */
  pServT?: "GOOSE" | "Report" | "SMV" | "Poll";
}

function describeExtRef(element: Element): ExtRefDescription {
  const extRefDesc: ExtRefDescription = {};

  const [
    iedName,
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    intAddr,
    srcCBName,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst,
    serviceType,
    pLN,
    pDO,
    pDA,
    pServT,
  ] = [
    "iedName",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName",
    "intAddr",
    "srcCBName",
    "srcLDInst",
    "srcPrefix",
    "srcLNClass",
    "srcLNInst",
    "serviceType",
    "pLN",
    "pDO",
    "pDA",
    "pServT",
  ].map((attr) => element.getAttribute(attr));

  if (iedName) extRefDesc.iedName = iedName;
  if (ldInst) extRefDesc.ldInst = ldInst;
  if (prefix) extRefDesc.prefix = prefix;
  if (lnClass) extRefDesc.lnClass = lnClass;
  if (lnInst) extRefDesc.lnInst = lnInst;
  if (doName) extRefDesc.doName = doName;
  if (daName) extRefDesc.daName = daName;
  if (lnInst) extRefDesc.lnInst = lnInst;
  if (intAddr) extRefDesc.intAddr = intAddr;
  if (srcCBName) extRefDesc.srcCBName = srcCBName;
  if (srcLDInst) extRefDesc.srcLDInst = srcLDInst;
  if (srcPrefix) extRefDesc.srcPrefix = srcPrefix;
  if (srcLNClass) extRefDesc.srcLNClass = srcLNClass;
  if (srcLNInst) extRefDesc.srcLNInst = srcLNInst;
  if (serviceType && ["Report", "SMV", "GOOSE", "Poll"].includes(serviceType))
    extRefDesc.serviceType = serviceType as "Report" | "SMV" | "GOOSE" | "Poll";
  if (pLN) extRefDesc.pLN = pLN;
  if (pDO) extRefDesc.pDO = pDO;
  if (pDA) extRefDesc.pDA = pDA;
  if (pServT && ["Report", "SMV", "GOOSE", "Poll"].includes(pServT))
    extRefDesc.pServT = pServT as "Report" | "SMV" | "GOOSE" | "Poll";

  return extRefDesc;
}

export interface InputsDescription extends NamingDescription {
  extRefs: ExtRefDescription[];
}

export function describeInputs(element: Element): InputsDescription {
  const inputsDesc: InputsDescription = {
    ...describeNaming(element),
    extRefs: [],
  };

  inputsDesc.extRefs.push(
    ...Array.from(element.children)
      .filter((child) => child.tagName === "ExtRef")
      .map((extRef) => describeExtRef(extRef))
      .sort(compareExtRefDescription),
  );

  return inputsDesc;
}
