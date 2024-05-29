import { ControlWithIEDNameDescription } from "./ControlWithIEDName.js";
interface SmvOpts {
    /** SmvOpts attribute refreshTime defaulted to false */
    refreshTime: boolean;
    /** SmvOpts attribute sampleSynchronized defaulted to true */
    sampleSynchronized: boolean;
    /** SmvOpts attribute sampleRate defaulted to false */
    sampleRate: boolean;
    /** SmvOpts attribute dataSet defaulted to false */
    dataSet: boolean;
    /** SmvOpts attribute security defaulted to false */
    security: boolean;
    /** SmvOpts attribute timestamp defaulted to false */
    timestamp: boolean;
    /** SmvOpts attribute synchSourceId defaulted to false */
    synchSourceId: boolean;
}
export interface SampledValueControlDescription extends ControlWithIEDNameDescription {
    /** SampledValueControl attribute multicast defaulted to true */
    multicast: boolean;
    /** SampledValueControl attribute smvID */
    smvID: string;
    /** SampledValueControl attribute smpRate*/
    smpRate: number;
    /** SampledValueControl attribute nofASDU */
    nofASDU: number;
    /** SampledValueControl attribute smpMod defaulted to "SmpPerPeriod" */
    smpMod: "SmpPerPeriod" | "SmpPerSec" | "SecPerSmp";
    /** SampleValueControl attribute securityEnable defaulted to "None" */
    securityEnable: "None" | "Signature" | "SignatureAndEncryption";
    /** SampledValueControl child Protocol */
    protocol?: {
        mustUnderstand: true;
        val: "R-SV";
    };
    /** SampledValueControl child SmvOpts */
    SmvOpts: SmvOpts;
}
export declare function describeSampledValueControl(element: Element): SampledValueControlDescription | undefined;
export {};
