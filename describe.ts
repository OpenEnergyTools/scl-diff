import { Private, PrivateDescription } from "./describe/Private.js";
import { Text, TextDescription } from "./describe/Text.js";
import { EnumType, EnumTypeDescription } from "./describe/EnumType.js";
import { DAType, DATypeDescription } from "./describe/DAType.js";
import { DOType, DOTypeDescription } from "./describe/DOType.js";
import { LNodeType, LNodeTypeDescription } from "./describe/LNodeType.js";

export type Description =
  | PrivateDescription
  | TextDescription
  | EnumTypeDescription
  | DATypeDescription
  | DOTypeDescription
  | LNodeTypeDescription;

const sclElementDescriptors: Partial<
  Record<string, (element: Element) => Description | undefined>
> = {
  Private,
  Text,
  EnumType,
  DAType,
  DOType,
  LNodeType,
};

export function describe(element: Element): Description | undefined {
  return sclElementDescriptors[element.tagName]?.(element);
}
