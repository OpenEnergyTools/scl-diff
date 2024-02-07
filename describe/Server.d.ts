import { LDeviceDescription } from "./LDevice.js";
import { NamingDescription } from "./Naming.js";
type Authentication = {
    /** Authentication attribute none defaulted to true */
    none: boolean;
    /** Authentication attribute password defaulted to false */
    password: boolean;
    /** Authentication attribute weak defaulted to false */
    weak: boolean;
    /** Authentication attribute strong defaulted to false */
    strong: boolean;
    /** Authentication attribute certificate defaulted to false */
    certificate: boolean;
};
type Association = {
    desc?: string;
    iedName: string;
    ldInst: string;
    /** Association attribute prefix defaulted to empty string */
    prefix: string;
    /** Association attribute lnClass */
    lnClass: string;
    /** Association attribute lnInst */
    lnInst: string;
    /** Association attribute kind */
    kind: "pre-established" | "predefined";
    /** Association attribute associationId */
    associationId?: string;
};
export interface ServerDescription extends NamingDescription {
    /** Server attribute timeout defaulted to 30 */
    timeout: number;
    /** Server child Authentication */
    authentication: Authentication;
    /** Server children LDevice */
    lDevices: Record<string, LDeviceDescription>;
    /** Server children Association */
    associations: Association[];
}
export declare function Server(element: Element): ServerDescription | undefined;
export {};
