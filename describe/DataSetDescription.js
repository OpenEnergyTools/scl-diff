import { describeNaming } from "./Naming.js";
export function describeDataSet(element) {
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
        if (!iedName || !ldInst || !lnClass || !doName || !fc)
            return;
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
    if (maybeData.some((fcda) => fcda === undefined))
        return undefined;
    return { ...describeNaming(element), data: maybeData };
}
//# sourceMappingURL=DataSetDescription.js.map