import { DODescription } from "./DODescription.js";
import { NamingDescription } from "./Naming.js";
export declare function isLNodeTypeDescription(type: any): type is LNodeTypeDescription;
export interface LNodeTypeDescription extends NamingDescription {
    /** Required attribute lnClass */
    lnClass: string;
    /** Optional attribute iedType */
    iedType?: string;
    /** Child DO elements. Key is required name attribute of DO child */
    dos: Record<string, DODescription>;
}
export declare function LNodeType(element: Element): LNodeTypeDescription | undefined;
