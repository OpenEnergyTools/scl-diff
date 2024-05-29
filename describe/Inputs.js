import { describeNaming } from "./Naming.js";
function compareExtRefDescription(a, b) {
    const stringifiedA = JSON.stringify(a);
    const stringifiedB = JSON.stringify(b);
    if (stringifiedA < stringifiedB)
        return -1;
    if (stringifiedA > stringifiedB)
        return 1;
    return 0;
}
function describeExtRef(element) {
    const extRefDesc = {};
    const [iedName, ldInst, prefix, lnClass, lnInst, doName, daName, intAddr, srcCBName, srcLDInst, srcPrefix, srcLNClass, srcLNInst, serviceType, pLN, pDO, pDA, pServT,] = [
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
    if (iedName)
        extRefDesc.iedName = iedName;
    if (ldInst)
        extRefDesc.ldInst = ldInst;
    if (prefix)
        extRefDesc.prefix = prefix;
    if (lnClass)
        extRefDesc.lnClass = lnClass;
    if (lnInst)
        extRefDesc.lnInst = lnInst;
    if (doName)
        extRefDesc.doName = doName;
    if (daName)
        extRefDesc.daName = daName;
    if (lnInst)
        extRefDesc.lnInst = lnInst;
    if (intAddr)
        extRefDesc.intAddr = intAddr;
    if (srcCBName)
        extRefDesc.srcCBName = srcCBName;
    if (srcLDInst)
        extRefDesc.srcLDInst = srcLDInst;
    if (srcPrefix)
        extRefDesc.srcPrefix = srcPrefix;
    if (srcLNClass)
        extRefDesc.srcLNClass = srcLNClass;
    if (srcLNInst)
        extRefDesc.srcLNInst = srcLNInst;
    if (serviceType && ["Report", "SMV", "GOOSE", "Poll"].includes(serviceType))
        extRefDesc.serviceType = serviceType;
    if (pLN)
        extRefDesc.pLN = pLN;
    if (pDO)
        extRefDesc.pDO = pDO;
    if (pDA)
        extRefDesc.pDA = pDA;
    if (pServT && ["Report", "SMV", "GOOSE", "Poll"].includes(pServT))
        extRefDesc.pServT = pServT;
    return extRefDesc;
}
export function describeInputs(element) {
    const inputsDesc = {
        ...describeNaming(element),
        extRefs: [],
    };
    inputsDesc.extRefs.push(...Array.from(element.children)
        .filter((child) => child.tagName === "ExtRef")
        .map((extRef) => describeExtRef(extRef))
        .sort(compareExtRefDescription));
    return inputsDesc;
}
//# sourceMappingURL=Inputs.js.map