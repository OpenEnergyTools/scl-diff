import { Private, PrivateDescription } from "./describe/Private.js";
import { Text, TextDescription } from "./describe/Text.js";
import { EnumType, EnumTypeDescription } from "./describe/EnumType.js";

export type Description =
  | PrivateDescription
  | TextDescription
  | EnumTypeDescription;

const sclElementDescriptors: Partial<
  Record<string, (element: Element) => Description>
> = {
  Private,
  Text,
  EnumType,
};

export function describe(element: Element): Description | undefined {
  return sclElementDescriptors[element.tagName]?.(element);
}
