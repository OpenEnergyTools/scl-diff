import { sortRecord } from "../utils.js";

import { GSEControlDescription, describeGSEControl } from "./GSEControl.js";
import { LN, LNDescription } from "./LN.js";
import {
  SampledValueControlDescription,
  describeSampledValueControl,
} from "./SampledValueControl.js";
import {
  SettingControlDescription,
  describeSettingControl,
} from "./SettingControl.js";

export interface LN0Description extends LNDescription {
  gseControls: Record<string, GSEControlDescription>;
  smvControls: Record<string, SampledValueControlDescription>;
  settingControl?: SettingControlDescription;
}

function gseControls(element: Element): Record<string, GSEControlDescription> {
  const unsortedGSEControls: Record<string, GSEControlDescription> = {};

  Array.from(element.children)
    .filter((child) => child.tagName === "GSEControl")
    .forEach((gseControl) => {
      const name = gseControl.getAttribute("name");
      const gseControlDescription = describeGSEControl(gseControl);
      if (name && !unsortedGSEControls[name] && gseControlDescription)
        unsortedGSEControls[name] = gseControlDescription;
    });

  return sortRecord(unsortedGSEControls) as Record<
    string,
    GSEControlDescription
  >;
}

function smvControls(
  element: Element,
): Record<string, SampledValueControlDescription> {
  const unsortedSampledValueControls: Record<
    string,
    SampledValueControlDescription
  > = {};

  Array.from(element.children)
    .filter((child) => child.tagName === "SampledValueControl")
    .forEach((smvControl) => {
      const name = smvControl.getAttribute("name");
      const smvControlDescription = describeSampledValueControl(smvControl);
      if (name && !unsortedSampledValueControls[name] && smvControlDescription)
        unsortedSampledValueControls[name] = smvControlDescription;
    });

  return sortRecord(unsortedSampledValueControls) as Record<
    string,
    SampledValueControlDescription
  >;
}

export function LN0(element: Element): LN0Description | undefined {
  const lnDescription = LN(element);
  if (!lnDescription) return;

  const ln0Description: LN0Description = {
    ...lnDescription,
    gseControls: gseControls(element),
    smvControls: smvControls(element),
  };

  const settingControl = element.querySelector(":scope > SettingControl");
  if (settingControl && describeSettingControl(settingControl))
    ln0Description.settingControl = describeSettingControl(settingControl);

  return ln0Description;
}
