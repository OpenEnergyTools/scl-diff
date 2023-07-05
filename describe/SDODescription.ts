import { DOType, DOTypeDescription } from "./DOType.js";
import { NamingDescription, describeNaming } from "./Naming.js";

export interface SDODescription extends NamingDescription {
  /** Type attribute referencing a DOType */
  type: DOTypeDescription | "invalidReference" | "invalidDOType";
}

export function describeSDO(element: Element): SDODescription | undefined {
  const referencedType = Array.from(
    element.closest("DataTypeTemplates")?.children ?? []
  ).find(
    (sibling) => sibling.getAttribute("id") === element.getAttribute("type")
  )!;
  if (!referencedType || referencedType.tagName !== "DOType") return undefined;

  const type = DOType(referencedType);
  if (!type) return undefined;

  return { ...describeNaming(element), type };
}
