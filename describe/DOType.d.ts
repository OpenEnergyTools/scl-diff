import { DADescription } from "./DADescription.js";
import { NamingDescription } from "./Naming.js";
import { SDODescription } from "./SDODescription.js";
export declare function isDOTypeDescription(type: any): type is DOTypeDescription;
declare const cdcs: readonly ["SPS", "DPS", "INS", "ENS", "ACT", "ACD", "SEC", "BCR", "HST", "VSS", "MV", "CMV", "SAV", "WYE", "DEL", "SEQ", "HMV", "HWYE", "HDEL", "SPC", "DPC", "INC", "ENC", "BSC", "ISC", "APC", "BAC", "SPG", "ING", "ENG", "ORG", "TSG", "CUG", "VSG", "ASG", "CURVE", "CSG", "DPL", "LPL", "CSD", "CST", "BTS", "UTS", "LTS", "GTS", "MTS", "NTS", "STS", "CTS", "OTS", "VSD", "ORS", "TCS"];
type CDC = (typeof cdcs)[number];
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
export declare function DOType(element: Element): DOTypeDescription | undefined;
export {};
