import { EnumValDescription, EnumVal } from "./describe/EnumVal.js";
import { Private, PrivateDescription } from "./describe/Private.js";
import { Text, TextDescription } from "./describe/Text.js";

export type Description =
  | EnumValDescription
  | PrivateDescription
  | TextDescription;

const sclElementDescriptors: Partial<
  Record<string, (element: Element) => Description>
> = {
  Private,
  Text,
  EnumVal,
};

export function describe(element: Element): Description | undefined {
  return sclElementDescriptors[element.tagName]?.(element);
}
