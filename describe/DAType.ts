import {
  AbstractDataAttributeDescription,
  describeDAorSDAorDAI,
} from "./AbstractDataAttribute.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { ProtNsDescription, describeProtNs } from "./ProtNs.js";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isDATypeDescription(type: any): type is DATypeDescription {
  return "bdas" in type && "protns" in type;
}

export interface DATypeDescription extends NamingDescription {
  /** Optional DAType iedType attribute */
  iedType?: string;
  /** `BDA` elements with existing attribute */
  bdas: Record<string, AbstractDataAttributeDescription>;
  protns: ProtNsDescription[];
}

export function DAType(element: Element): DATypeDescription {
  const daTypeDesc: DATypeDescription = {
    ...describeNaming(element),
    bdas: {},
    protns: [],
  };

  const iedType = element.getAttribute("iedType");
  if (iedType) daTypeDesc.iedType = iedType;

  Array.from(element.children)
    .filter((child) => child.tagName === "BDA" || child.tagName === "ProtNs")
    .forEach((bdaOrProtNs) => {
      if (
        bdaOrProtNs.tagName === "BDA" &&
        bdaOrProtNs.getAttribute("name") &&
        bdaOrProtNs.getAttribute("bType")
      )
        daTypeDesc.bdas[bdaOrProtNs.getAttribute("name")!] =
          describeDAorSDAorDAI(bdaOrProtNs);
      if (bdaOrProtNs.tagName === "ProtNs")
        daTypeDesc.protns.push(describeProtNs(bdaOrProtNs));
    });

  return daTypeDesc;
}
