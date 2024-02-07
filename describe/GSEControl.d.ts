import { ControlWithIEDNameDescription } from "./ControlWithIEDName.js";
export interface GSEControlDescription extends ControlWithIEDNameDescription {
    /** GSEControl attribute type defaulted to "GOOSE" */
    type: "GOOSE" | "GSSE";
    /** GSEControl attribute appId */
    appID: string;
    /** GSEControl attribute fixedOffs defaulted to false */
    fixedOffs: boolean;
    /** GSEControl attribute securityEnable defaulted to "None" */
    securityEnable: "None" | "Signature" | "SignatureAndEncryption";
    /**GSEControl child Protocol*/
    protocol?: {
        mustUnderstand: true;
        val: "R-GOOSE";
    };
}
export declare function describeGSEControl(element: Element): GSEControlDescription | undefined;
