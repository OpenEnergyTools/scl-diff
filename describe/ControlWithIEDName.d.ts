import { ControlDescription } from "./Control.js";
interface IEDName {
    /** IEDName attribute apRef*/
    apRef?: string;
    /** IEDName attribute ldInst*/
    ldInst?: string;
    /** IEDName attribute prefix*/
    prefix?: string;
    /** IEDName attribute lnClass*/
    lnClass?: string;
    /** IEDName attribute lnInst*/
    lnInst?: string;
    /** IEDName child text content */
    val?: string;
}
export interface ControlWithIEDNameDescription extends ControlDescription {
    /** ControlWithIEDName children IEDName */
    iedNames: IEDName[];
    /** ControlWithIEDName attribute confRev defaulted to 0 */
    confRev?: number;
}
export declare function describeControlWithIEDName(element: Element): ControlWithIEDNameDescription | undefined;
export {};
