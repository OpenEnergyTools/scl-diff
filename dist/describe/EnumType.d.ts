import { NamingDescription } from "./Naming.js";
export declare function isEnumTypeDescription(type: any): type is EnumTypeDescription;
export interface EnumTypeDescription extends NamingDescription {
    enumVals: Record<number, {
        desc: string;
        content: string;
    }>;
}
export declare function EnumType(element: Element): EnumTypeDescription;
