import { sortRecord } from "../utils.js";

import { DADescription, describeDA } from "./DADescription.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { SDODescription, describeSDO } from "./SDODescription.js";

export function isDOTypeDescription(type: any): type is DOTypeDescription {
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
] as const;

type CDC = (typeof cdcs)[number];

const cdcSet = new Set<string>(cdcs);
function isCDC(attribute: string): attribute is CDC {
  return cdcSet.has(attribute);
}

export interface DOTypeDescription extends NamingDescription {
  /** Required attribute cdc */
  cdc: CDC;
  /** Optional attribute iedType*/
  iedType?: string;
  /** Child elements DA key is required name attribute of DA child */
  das: Record<string, DADescription>;
  /** Child elements SDO key is required name attribute of DA child */
  sdos: Record<string, SDODescription>;
}

export function DOType(element: Element): DOTypeDescription | undefined {
  const cdc = element.getAttribute("cdc");
  if (!cdc || !isCDC(cdc)) return undefined;

  const doTypeDescription: DOTypeDescription = {
    ...describeNaming(element),
    cdc: element.getAttribute("cdc") as CDC,
    das: {},
    sdos: {},
  };

  if (element.getAttribute("iedType"))
    doTypeDescription.iedType = element.getAttribute("iedType")!;

  const unsortedDAs: Record<string, DADescription> = {};
  const unsortedSDOs: Record<string, SDODescription> = {};
  Array.from(element.children)
    .filter((child) => child.tagName === "DA" || child.tagName === "SDO")
    .forEach((daOrSdo) => {
      const [name, bType, fc, type] = ["name", "bType", "fc", "type"].map(
        (attr) => daOrSdo.getAttribute(attr)
      );

      if (daOrSdo.tagName === "DA" && name && fc && bType) {
        const daDescription = describeDA(daOrSdo);
        if (daDescription) unsortedDAs[name!] = daDescription;
      }

      if (daOrSdo.tagName === "SDO" && name && type) {
        const sdoDescription = describeSDO(daOrSdo);
        if (sdoDescription) unsortedSDOs[name!] = sdoDescription;
      }
    });

  doTypeDescription.das = sortRecord(unsortedDAs);
  doTypeDescription.sdos = sortRecord(unsortedSDOs);

  return doTypeDescription;
}
