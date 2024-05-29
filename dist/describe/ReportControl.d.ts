import { ControlWithTriggerOptDescription } from "./ControlWithTriggerOpt.js";
interface Client {
    /** ClientLN attribute iedName */
    iedName: string;
    /** ClientLN attribute apRef (optional for reverse compatibility)*/
    apRef?: string;
    /** ClientLN attribute ldInst */
    ldInst: string;
    /** ClientLN attribute prefix defaulting to "" */
    prefix: string;
    /** ClientLN attribute lnClass */
    lnClass: string;
    /** ClientLN attribute lnInst defaulting to "" */
    lnInst: string;
}
interface OptFields {
    /** OptFields attribute seqNum defaulting to false*/
    seqNum: boolean;
    /** OptFields attribute timeStamp defaulting to false*/
    timeStamp: boolean;
    /** OptFields attribute dataSet defaulting to false*/
    dataSet: boolean;
    /** OptFields attribute reasonCode defaulting to false*/
    reasonCode: boolean;
    /** OptFields attribute dataRef defaulting to false*/
    dataRef: boolean;
    /** OptFields attribute entryID defaulting to false*/
    entryID: boolean;
    /** OptFields attribute configRef defaulting to false*/
    configRef: boolean;
    /** OptFields attribute bufOvfl defaulting to false*/
    bufOvfl: boolean;
}
export interface ReportControlDescription extends ControlWithTriggerOptDescription {
    /** ReportControl attribute index defaulted to true */
    indexed: boolean;
    /** ReportControl attribute bufTime defaulted to 0 */
    bufTime: number;
    /** ReportControl attribute buffered defaulted to false */
    buffered: boolean;
    /** ReportControl attribute confRev defaulted to 0 */
    confRev: number;
    /** ReportControl attribute rptID */
    rptID?: string;
    /** ReportControl child element OptFields */
    optFields: OptFields;
    /** Child RptEnabled max attribute */
    maxClients: number;
    /** Child element ClientLN  */
    clients: Client[];
}
export declare function describeReportControl(element: Element): ReportControlDescription | undefined;
export {};
