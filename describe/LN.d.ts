import { LNodeTypeDescription } from "./LNodeType.js";
import { LogControlDescription } from "./LogControl.js";
import { NamingDescription } from "./Naming.js";
import { InputsDescription } from "./Inputs.js";
import { ReportControlDescription } from "./ReportControl.js";
export declare function sortedLNDescriptions(parent: Element): Record<string, LNDescription> | undefined;
export interface LNDescription extends NamingDescription {
    reports: Record<string, ReportControlDescription>;
    logControls: Record<string, LogControlDescription>;
    logs: Record<string, NamingDescription>;
    inputs?: InputsDescription;
    lnType: LNodeTypeDescription;
}
export declare function LN(element: Element): LNDescription | undefined;
