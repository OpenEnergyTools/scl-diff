import { Private } from "./Private.js";
import { Text } from "./Text.js";

type ExtensionNSAttributes = Record<string, Record<string, string | null>>;

export interface BaseElementDescription {
  /** canonicalized XML of `Private` elements */
  privates: string[];
  /** some representation of `Text` elements */
  texts: string[];
  /** attributes from other namespace */
  eNSAttributes: ExtensionNSAttributes;
}

export function describeBaseElement(element: Element): BaseElementDescription {
  const baseElement: BaseElementDescription = {
    privates: [],
    texts: [],
    eNSAttributes: {},
  };

  Array.from(element.children).forEach((child) => {
    if (child.tagName === "Private") baseElement.privates.push(Private(child));
    if (child.tagName === "Text") baseElement.texts.push(Text(child));
  });

  Array.from(element.attributes).forEach((attr) => {
    if (attr.namespaceURI) {
      if (!baseElement.eNSAttributes[attr.namespaceURI])
        baseElement.eNSAttributes[attr.namespaceURI] = {};

      baseElement.eNSAttributes[attr.namespaceURI][attr.name] = attr.value;
    }
  });

  return baseElement;
}
