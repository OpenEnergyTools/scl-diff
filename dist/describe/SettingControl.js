import { describeNaming } from "./Naming.js";
export function describeSettingControl(element) {
    const numOfSGs = element.getAttribute("numOfSGs");
    if (!numOfSGs || isNaN(parseInt(numOfSGs, 10)))
        return;
    const settingGroupDescription = {
        ...describeNaming(element),
        numOfSGs: parseInt(numOfSGs, 10),
    };
    const actSG = element.getAttribute("actSG");
    if (actSG && !isNaN(parseInt(actSG, 10)))
        settingGroupDescription.actSG = parseInt(actSG, 10);
    const resvTms = element.getAttribute("resvTms");
    if (resvTms && !isNaN(parseInt(resvTms, 10)))
        settingGroupDescription.resvTms = parseInt(resvTms, 10);
    return settingGroupDescription;
}
//# sourceMappingURL=SettingControl.js.map