export declare function isProtNsDescription(type: any): type is ProtNsDescription;
export type ProtNsDescription = {
    /** Type of namespace defaulting to "8-MMS" */
    type: string;
    /** ProtNs textContent defaulting to "" */
    val: string;
};
export declare function describeProtNs(element: Element): ProtNsDescription;
