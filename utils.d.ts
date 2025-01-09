import { AccessPointDescription, Certificate } from "./describe/AccessPoint.js";
import { DADescription } from "./describe/DADescription.js";
import { DODescription } from "./describe/DODescription.js";
import { GSEControlDescription } from "./describe/GSEControl.js";
import { LDeviceDescription } from "./describe/LDevice.js";
import { LNDescription } from "./describe/LN.js";
import { LogControlDescription } from "./describe/LogControl.js";
import { NamingDescription } from "./describe/Naming.js";
import { ReportControlDescription } from "./describe/ReportControl.js";
import { SDODescription } from "./describe/SDODescription.js";
import { SampledValueControlDescription } from "./describe/SampledValueControl.js";
type SortedObjects = AccessPointDescription | Certificate | DADescription | GSEControlDescription | LDeviceDescription | LNDescription | LogControlDescription | NamingDescription | SampledValueControlDescription | SDODescription | ReportControlDescription | DODescription;
/** @returns Alphabetically sorted object keys */
export declare function sortRecord(object: Record<string, SortedObjects>): Record<string, SortedObjects>;
/** @returns DOType/DAType/EnumType reference by the elements type attribute */
export declare function referencedDataType(element: Element): Element | undefined;
export {};
