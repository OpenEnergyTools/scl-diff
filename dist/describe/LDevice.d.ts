import { LN0Description } from "./LN0.js";
import { LNDescription } from "./LN.js";
import { NamingDescription } from "./Naming.js";
export interface LDeviceDescription extends NamingDescription {
    /** LDevice attribute ldName */
    ldName?: string;
    /** LDevice child LN0 */
    ln0: LN0Description;
    /** LDevice children LN */
    lns: Record<string, LNDescription>;
    /** LDevice child AccessControl */
    accessControl?: string;
}
export declare function LDevice(element: Element): LDeviceDescription | undefined;
