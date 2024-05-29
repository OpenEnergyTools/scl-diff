import { LNDescription } from "./LN.js";
import { NamingDescription } from "./Naming.js";
import { ServerDescription } from "./Server.js";
import { ServicesDescription } from "./Services.js";
interface Cert {
    /** Cert attribute commonName */
    commonName: string;
    /** Cert attribute idHierarchy */
    idHierarchy: string;
}
export interface Certificate extends NamingDescription {
    /** Certificate attribute serialNumber */
    serialNumber: number;
    /** Certificate attribute xferNumber */
    xferNumber?: number;
    /** Certificate child Subject */
    subject: Cert;
    /** Certificate child IssuerName */
    issuerName: Cert;
}
interface ServerAtDescription extends NamingDescription {
    /** ServerAt attribute apName */
    apName: string;
}
export interface AccessPointDescription extends NamingDescription {
    /** AccessPoint attribute router defaulted false */
    router: boolean;
    /** AccessPoint attribute clock defaulted false */
    clock: boolean;
    /** AccessPoint attribute kdc defaulted false */
    kdc: boolean;
    /** AccessPoint child Services */
    services?: ServicesDescription;
    /** AccessPoint child Server */
    server?: ServerDescription;
    /** AccessPoint children ServerAt */
    serverAt?: ServerAtDescription;
    /** AccessPoint children LN */
    lns: Record<string, LNDescription>;
    /** AccessPoint children GOOSESecurity */
    gooseSecurities: Record<string, Certificate>;
    /** AccessPoint children SMVSecurity */
    smvSecurities: Record<string, Certificate>;
}
export declare function AccessPoint(element: Element): AccessPointDescription | undefined;
export {};
