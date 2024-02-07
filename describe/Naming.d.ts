import { BaseElementDescription } from "./BaseElement.js";
export interface NamingDescription extends BaseElementDescription {
    desc?: string;
}
export declare function describeNaming(element: Element): NamingDescription;
