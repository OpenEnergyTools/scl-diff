import { Private, PrivateDescription } from "./describe/Private.js";
import { Text, TextDescription } from "./describe/Text.js";

export type Description = PrivateDescription | TextDescription;

const sclElementDescriptors: Partial<
  Record<string, (element: Element) => Description>
> = {
  Private,
  Text,
};

export function describe(element: Element): Description | undefined {
  return sclElementDescriptors[element.tagName]?.(element);
}
