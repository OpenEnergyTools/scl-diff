import { NamingDescription } from "./Naming.js";
type FCDA = {
    iedName: string;
    ldInst: string;
    prefix: string;
    lnClass: string;
    lnInst: string;
    doName: string;
    daName?: string;
    fc: string;
};
export interface DataSetDescription extends NamingDescription {
    data: FCDA[];
}
export declare function describeDataSet(element: Element): DataSetDescription | undefined;
export {};
