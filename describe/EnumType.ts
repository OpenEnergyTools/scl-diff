import { NamingDescription, describeNaming } from "./Naming.js";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isEnumTypeDescription(type: any): type is EnumTypeDescription {
  return "enumVals" in type;
}

export interface EnumTypeDescription extends NamingDescription {
  enumVals: Record<number, { desc: string; content: string }>;
}

export function EnumType(element: Element): EnumTypeDescription {
  const enumTypeDesc: EnumTypeDescription = {
    ...describeNaming(element),
    enumVals: {},
  };

  Array.from(element.getElementsByTagName("EnumVal")).forEach((enumVal) => {
    const ordAttr = enumVal.getAttribute("ord");
    if (!ordAttr) return;

    const ord = parseInt(ordAttr, 10);
    if (isNaN(ord)) return;

    enumTypeDesc.enumVals[ord] = {
      desc: enumVal.getAttribute("desc") ?? "",
      content: enumVal.textContent ?? "",
    };
  });

  return enumTypeDesc;
}
