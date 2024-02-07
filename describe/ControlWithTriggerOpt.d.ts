import { ControlDescription } from "./Control.js";
type TrgOps = {
    /** TrgOpts attribute dchg defaulting to false*/
    dchg: boolean;
    /** TrgOpts attribute qchg defaulting to false*/
    qchg: boolean;
    /** TrgOpts attribute dupt defaulting to false*/
    dupd: boolean;
    /** TrgOpts attribute period defaulting to false*/
    period: boolean;
    /** TrgOpts attribute gi defaulting to false*/
    gi: boolean;
};
export interface ControlWithTriggerOptDescription extends ControlDescription {
    trgOps: TrgOps;
    /** ReportControl attribute intgPd defaulted to 0 */
    intgPd: number;
}
export declare function describeControlWithTriggerOpt(element: Element): ControlWithTriggerOptDescription | undefined;
export {};
