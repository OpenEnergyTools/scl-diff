/** Sort `ValDescription` by `sGroup` attribute */
export declare function compareBySGroup(a: ValDescription, b: ValDescription): number;
export interface ValDescription {
    /** Optional Val attribute sGroup */
    sGroup?: number;
    /** Val elements text content defaulting to "" */
    val: string;
}
export declare function describeVal(element: Element): ValDescription;
