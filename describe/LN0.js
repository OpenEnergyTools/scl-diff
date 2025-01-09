import { sortRecord } from "../utils.js";
import { describeGSEControl } from "./GSEControl.js";
import { LN } from "./LN.js";
import { describeSampledValueControl, } from "./SampledValueControl.js";
import { describeSettingControl, } from "./SettingControl.js";
function gseControls(element) {
    const unsortedGSEControls = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "GSEControl")
        .forEach((gseControl) => {
        const name = gseControl.getAttribute("name");
        const gseControlDescription = describeGSEControl(gseControl);
        if (name && !unsortedGSEControls[name] && gseControlDescription)
            unsortedGSEControls[name] = gseControlDescription;
    });
    return sortRecord(unsortedGSEControls);
}
function smvControls(element) {
    const unsortedSampledValueControls = {};
    Array.from(element.children)
        .filter((child) => child.tagName === "SampledValueControl")
        .forEach((smvControl) => {
        const name = smvControl.getAttribute("name");
        const smvControlDescription = describeSampledValueControl(smvControl);
        if (name && !unsortedSampledValueControls[name] && smvControlDescription)
            unsortedSampledValueControls[name] = smvControlDescription;
    });
    return sortRecord(unsortedSampledValueControls);
}
export function LN0(element) {
    const lnDescription = LN(element);
    if (!lnDescription)
        return;
    const ln0Description = {
        ...lnDescription,
        gseControls: gseControls(element),
        smvControls: smvControls(element),
    };
    const settingControl = element.querySelector(":scope > SettingControl");
    if (settingControl && describeSettingControl(settingControl))
        ln0Description.settingControl = describeSettingControl(settingControl);
    return ln0Description;
}
//# sourceMappingURL=LN0.js.map