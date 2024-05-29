import { describeDAorSDAorDAI, } from "./AbstractDataAttribute.js";
import { describeProtNs } from "./ProtNs.js";
const fCs = ["ST", "MX", "CO", "SP", "SG", "SE", "SV", "CF", "DC", "EX"];
export function describeDA(element) {
    const daDescription = {
        ...describeDAorSDAorDAI(element),
        dchg: false,
        qchg: false,
        dupd: false,
        fc: "ST",
        protns: [],
    };
    const [dchg, qchg, dupd, fc] = ["dchg", "qchg", "dupd", "fc"].map((attr) => element.getAttribute(attr));
    if (dchg && dchg === "true")
        daDescription.dchg = true;
    if (qchg && qchg === "true")
        daDescription.qchg = true;
    if (dupd && dupd === "true")
        daDescription.dupd = true;
    if (fc && fCs.includes(fc))
        daDescription.fc = fc;
    Array.from(element.children)
        .filter((child) => child.tagName === "ProtNs")
        .forEach((protNs) => {
        if (protNs.tagName === "ProtNs")
            daDescription.protns.push(describeProtNs(protNs));
    });
    return daDescription;
}
//# sourceMappingURL=DADescription.js.map