import { describeDAorSDAorDAI, } from "./AbstractDataAttribute.js";
import { describeNaming } from "./Naming.js";
import { describeProtNs } from "./ProtNs.js";
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isDATypeDescription(type) {
    return "bdas" in type && "protns" in type;
}
export function DAType(element) {
    const daTypeDesc = {
        ...describeNaming(element),
        bdas: {},
        protns: [],
    };
    const iedType = element.getAttribute("iedType");
    if (iedType)
        daTypeDesc.iedType = iedType;
    Array.from(element.children)
        .filter((child) => child.tagName === "BDA" || child.tagName === "ProtNs")
        .forEach((bdaOrProtNs) => {
        if (bdaOrProtNs.tagName === "BDA" &&
            bdaOrProtNs.getAttribute("name") &&
            bdaOrProtNs.getAttribute("bType"))
            daTypeDesc.bdas[bdaOrProtNs.getAttribute("name")] =
                describeDAorSDAorDAI(bdaOrProtNs);
        if (bdaOrProtNs.tagName === "ProtNs")
            daTypeDesc.protns.push(describeProtNs(bdaOrProtNs));
    });
    return daTypeDesc;
}
//# sourceMappingURL=DAType.js.map