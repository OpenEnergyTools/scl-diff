import { NamingDescription } from "./Naming.js";
export interface SettingControlDescription extends NamingDescription {
    numOfSGs: number;
    actSG?: number;
    resvTms?: number;
}
export declare function describeSettingControl(element: Element): SettingControlDescription | undefined;
