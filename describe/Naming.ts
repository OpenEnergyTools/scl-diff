import { BaseElementDescription, describeBaseElement } from "./BaseElement";

export interface NamingDescription extends BaseElementDescription {
  desc?: string;
}

export function describeNaming(element: Element): NamingDescription {
  const idNameDescription: NamingDescription = {
    ...describeBaseElement(element),
  };

  if (element.getAttribute("desc"))
    idNameDescription.desc = element.getAttribute("desc")!;

  return idNameDescription;
}
