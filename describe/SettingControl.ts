import { NamingDescription, describeNaming } from "./Naming.js";

export interface SettingControlDescription extends NamingDescription {
  numOfSGs: number;
  actSG?: number;
  resvTms?: number;
}

export function describeSettingControl(
  element: Element,
): SettingControlDescription | undefined {
  const numOfSGs = element.getAttribute("numOfSGs");
  if (!numOfSGs || isNaN(parseInt(numOfSGs, 10))) return;

  const settingGroupDescription: SettingControlDescription = {
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
