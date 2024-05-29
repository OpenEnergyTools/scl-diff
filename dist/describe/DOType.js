import { sortRecord } from "../utils.js";
import { describeDA } from "./DADescription.js";
import { describeNaming } from "./Naming.js";
import { describeSDO } from "./SDODescription.js";
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isDOTypeDescription(type) {
    return "cdc" in type;
}
const cdcs = [
    "SPS",
    "DPS",
    "INS",
    "ENS",
    "ACT",
    "ACD",
    "SEC",
    "BCR",
    "HST",
    "VSS",
    "MV",
    "CMV",
    "SAV",
    "WYE",
    "DEL",
    "SEQ",
    "HMV",
    "HWYE",
    "HDEL",
    "SPC",
    "DPC",
    "INC",
    "ENC",
    "BSC",
    "ISC",
    "APC",
    "BAC",
    "SPG",
    "ING",
    "ENG",
    "ORG",
    "TSG",
    "CUG",
    "VSG",
    "ASG",
    "CURVE",
    "CSG",
    "DPL",
    "LPL",
    "CSD",
    "CST",
    "BTS",
    "UTS",
    "LTS",
    "GTS",
    "MTS",
    "NTS",
    "STS",
    "CTS",
    "OTS",
    "VSD",
    "ORS",
    "TCS",
];
const cdcSet = new Set(cdcs);
function isCDC(attribute) {
    return cdcSet.has(attribute);
}
export function DOType(element) {
    const cdc = element.getAttribute("cdc");
    if (!cdc || !isCDC(cdc))
        return undefined;
    const doTypeDescription = {
        ...describeNaming(element),
        cdc: element.getAttribute("cdc"),
        das: {},
        sdos: {},
    };
    if (element.getAttribute("iedType"))
        doTypeDescription.iedType = element.getAttribute("iedType");
    const unsortedDAs = {};
    const unsortedSDOs = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "DA" || child.tagName === "SDO")
        .forEach((daOrSdo) => {
        const [name, bType, fc, type] = ["name", "bType", "fc", "type"].map((attr) => daOrSdo.getAttribute(attr));
        if (daOrSdo.tagName === "DA" && name && fc && bType) {
            const daDescription = describeDA(daOrSdo);
            if (daDescription)
                unsortedDAs[name] = daDescription;
        }
        if (daOrSdo.tagName === "SDO" && name && type) {
            const sdoDescription = describeSDO(daOrSdo);
            if (sdoDescription)
                unsortedSDOs[name] = sdoDescription;
        }
    });
    doTypeDescription.das = sortRecord(unsortedDAs);
    doTypeDescription.sdos = sortRecord(unsortedSDOs);
    return doTypeDescription;
}
//# sourceMappingURL=DOType.js.map