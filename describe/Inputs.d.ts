import { NamingDescription } from "./Naming.js";
type ExtRefDescription = {
    /** Source IED name attribute */
    iedName?: string;
    /** Source LDevice inst attribute */
    ldInst?: string;
    /** Source AnyLn prefix attribute */
    prefix?: string;
    /** Source AnyLn lnClass attribute */
    lnClass?: string;
    /** Source AnyLn lnInst attribute */
    lnInst?: string;
    /** Source data object(s) */
    doName?: string;
    /** Source data attributes(s) */
    daName?: string;
    /** ExtRef attribute instAddr attribute */
    intAddr?: string;
    /** Source control block name attribute */
    srcCBName?: string;
    /** Source control block parent LDevice inst attribute */
    srcLDInst?: string;
    /** Source control block parent AnyLn prefix attribute */
    srcPrefix?: string;
    /** Source control block parent AnyLn lnInst attribute */
    srcLNClass?: string;
    /** Source control block parent AnyLn inst attribute */
    srcLNInst?: string;
    /** Source control block type */
    serviceType?: "GOOSE" | "Report" | "SMV" | "Poll";
    /** Restriction logical node class */
    pLN?: string;
    /** Restriction data object name(s) */
    pDO?: string;
    /** Restriction data attribute name(s) */
    pDA?: string;
    /** Restriction control block type */
    pServT?: "GOOSE" | "Report" | "SMV" | "Poll";
};
export interface InputsDescription extends NamingDescription {
    extRefs: ExtRefDescription[];
}
export declare function describeInputs(element: Element): InputsDescription;
export {};
