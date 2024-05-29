import { DATypeDescription } from "./DAType.js";
import { EnumTypeDescription } from "./EnumType.js";
import { NamingDescription } from "./Naming.js";
import { ValDescription } from "./Val.js";
export declare function isAbstractDataAttributeDescription(type: any): type is AbstractDataAttributeDescription;
export interface AbstractDataAttributeDescription extends NamingDescription {
    /** Required (B)DA bType attribute sAddr */
    bType: string;
    /** Reference to DAType (bType: Struct) or EnumType(bType: Enum) */
    type?: DATypeDescription | EnumTypeDescription;
    /** (B)DA sAddr attribute sAddr */
    sAddr?: string;
    /** (B)DA valKind attribute defaulting to "Set" */
    valKind: "Spec" | "Conf" | "RO" | "Set";
    /** (B)DA valKind attribute defaulting false */
    valImport: boolean;
    /** (B)DA valKind attribute defaulting 0 */
    count: number;
    vals: ValDescription[];
}
export declare function describeDAorSDAorDAI(element: Element): AbstractDataAttributeDescription;
