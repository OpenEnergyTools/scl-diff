/** Sort `ValDescription` by `sGroup` attribute */
export function compareBySGroup(a, b) {
    if (!a.sGroup || !b.sGroup)
        return 0;
    else if (a.sGroup < b.sGroup)
        return -1;
    return 1;
}
export function describeVal(element) {
    const valDesc = { val: "" };
    if (element.getAttribute("sGroup") &&
        !isNaN(parseInt(element.getAttribute("sGroup"), 10)))
        valDesc.sGroup = parseInt(element.getAttribute("sGroup"), 10);
    valDesc.val = element.textContent ?? "";
    return valDesc;
}
//# sourceMappingURL=Val.js.map