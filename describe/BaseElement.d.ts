type ExtensionNSAttributes = Record<string, Record<string, string | null>>;
export interface BaseElementDescription {
    /** canonicalized XML of `Private` elements */
    privates: string[];
    /** some representation of `Text` elements */
    texts: string[];
    /** attributes from other namespace */
    eNSAttributes: ExtensionNSAttributes;
}
export declare function describeBaseElement(element: Element): BaseElementDescription;
export {};
