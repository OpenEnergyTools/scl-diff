import { AbstractDataAttributeDescription } from "./AbstractDataAttribute.js";
import { NamingDescription } from "./Naming.js";
import { ProtNsDescription } from "./ProtNs.js";
export declare function isDATypeDescription(type: any): type is DATypeDescription;
export interface DATypeDescription extends NamingDescription {
    /** Optional DAType iedType attribute */
    iedType?: string;
    /** `BDA` elements with existing attribute */
    bdas: Record<string, AbstractDataAttributeDescription>;
    protns: ProtNsDescription[];
}
export declare function DAType(element: Element): DATypeDescription;
