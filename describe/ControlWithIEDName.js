import { describeControl } from "./Control.js";
function compareIEDNameDescription(a, b) {
    const stringifiedA = JSON.stringify(a);
    const stringifiedB = JSON.stringify(b);
    if (stringifiedA < stringifiedB)
        return -1;
    if (stringifiedA > stringifiedB)
        return 1;
    return 0;
}
function describeIEDName(element) {
    const iedName = {};
    const [apRef, ldInst, prefix, lnClass, lnInst] = [
        "apRef",
        "ldInst",
        "prefix",
        "lnClass",
        "lnInst",
    ].map((attr) => element.getAttribute(attr));
    const val = element.textContent;
    if (apRef)
        iedName.apRef = apRef;
    if (ldInst)
        iedName.ldInst = ldInst;
    if (prefix)
        iedName.prefix = prefix;
    if (lnClass)
        iedName.lnClass = lnClass;
    if (lnInst)
        iedName.lnInst = lnInst;
    if (val)
        iedName.val = val;
    return iedName;
}
export function describeControlWithIEDName(element) {
    const controlDescription = describeControl(element);
    if (!controlDescription)
        return;
    const controlWithIEDNameDescription = {
        ...controlDescription,
        iedNames: [],
    };
    controlWithIEDNameDescription.iedNames.push(...Array.from(element.children)
        .filter((child) => child.tagName === "IEDName")
        .map((iedName) => describeIEDName(iedName))
        .sort(compareIEDNameDescription));
    const confRev = element.getAttribute("confRev");
    if (confRev && !isNaN(parseInt(confRev, 10)))
        controlWithIEDNameDescription.confRev = parseInt(confRev, 10);
    return controlWithIEDNameDescription;
}
//# sourceMappingURL=ControlWithIEDName.js.map