import { AbstractDataAttributeDescription } from "./AbstractDataAttribute.js";
import { ProtNsDescription } from "./ProtNs.js";
type FCs = "ST" | "MX" | "CO" | "SP" | "SG" | "SE" | "SV" | "CF" | "DC" | "EX";
export interface DADescription extends AbstractDataAttributeDescription {
    /** Optional attribute dchg defaults to false */
    dchg: boolean;
    /** Optional attribute qchg defaults to false */
    qchg: boolean;
    /** Optional attribute dupd defaults to false */
    dupd: boolean;
    /** required attribute fc */
    fc: FCs;
    /** Direct child element ProtNS */
    protns: ProtNsDescription[];
}
export declare function describeDA(element: Element): DADescription;
export {};
