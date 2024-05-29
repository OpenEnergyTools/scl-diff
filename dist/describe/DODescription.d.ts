import { DOTypeDescription } from "./DOType.js";
import { NamingDescription } from "./Naming.js";
export interface DODescription extends NamingDescription {
    /** Option attribute accessControl */
    accessControl?: string;
    /** Optional attribute transient defaulting to false */
    transient: boolean;
    /** Required attribute referencing a DOType */
    type: DOTypeDescription;
}
export declare function describeDO(element: Element): DODescription | undefined;
