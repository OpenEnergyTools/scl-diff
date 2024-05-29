import { GSEControlDescription } from "./GSEControl.js";
import { LNDescription } from "./LN.js";
import { SampledValueControlDescription } from "./SampledValueControl.js";
import { SettingControlDescription } from "./SettingControl.js";
export interface LN0Description extends LNDescription {
    gseControls: Record<string, GSEControlDescription>;
    smvControls: Record<string, SampledValueControlDescription>;
    settingControl?: SettingControlDescription;
}
export declare function LN0(element: Element): LN0Description | undefined;
