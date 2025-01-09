import { ControlWithTriggerOptDescription } from "./ControlWithTriggerOpt.js";
export interface LogControlDescription extends ControlWithTriggerOptDescription {
    /** ReportControl attribute ldInst.  */
    ldInst: string | null;
    /** LogControl attribute prefix defaulted to "". */
    prefix: string;
    /** LogControl attribute lnClass defaulted to "LLN0". */
    lnClass: string;
    /** LogControl attribute lnInst. */
    lnInst: string | null;
    /** LogControl attribute logName. Must point to valid `Log` element */
    logName: string;
    /** LogControl attribute logEna defaulted to true. */
    logEna: boolean;
    /** LogControl attribute reasonCode defaulted to true. */
    reasonCode: boolean;
    /** LogCOntrol attribute bufTime defaulted to "0".  */
    bufTime: number;
}
export declare function describeLogControl(element: Element): LogControlDescription | undefined;
