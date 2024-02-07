import { DOTypeDescription } from "./DOType.js";
import { NamingDescription } from "./Naming.js";
export interface SDODescription extends NamingDescription {
    /** Type attribute referencing a DOType */
    type: DOTypeDescription | "invalidReference" | "invalidDOType";
}
export declare function describeSDO(element: Element): SDODescription | undefined;
