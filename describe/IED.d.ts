import { AccessPointDescription } from "./AccessPoint.js";
import { NamingDescription } from "./Naming.js";
import { ServicesDescription } from "./Services.js";
type KDCDescription = {
    /** IED attribute iedName */
    iedName: string;
    /** IED attribute apName */
    apName: string;
};
export interface IEDDescription extends NamingDescription {
    /** IED attribute type */
    type?: string;
    /** IED attribute manufacturer */
    manufacturer?: string;
    /** IED attribute configVersion */
    configVersion?: string;
    /** IED attribute originalSclVersion defaulting 2003*/
    originalSclVersion: number;
    /** IED attribute originalSclRevision defaulting "A"*/
    originalSclRevision: string;
    /** IED attribute originalSclRelease defaulting 1*/
    originalSclRelease: number;
    /** IED attribute engRight defaulting "full" */
    engRight: string;
    /** IED attribute owner  */
    owner?: string;
    /** IED child Services */
    services?: ServicesDescription;
    /** IED children AccessPoint */
    accessPoints: Record<string, AccessPointDescription>;
    /** IED children KDC */
    kDCs: KDCDescription[];
}
export declare function IED(element: Element): IEDDescription | undefined;
export {};
