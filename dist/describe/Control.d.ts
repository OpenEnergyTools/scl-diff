import { DataSetDescription } from "./DataSetDescription.js";
import { NamingDescription } from "./Naming.js";
export interface ControlDescription extends NamingDescription {
    dataSet?: DataSetDescription;
}
export declare function describeControl(element: Element): ControlDescription | undefined;
