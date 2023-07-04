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

function sortENsAttributes(
  eNsAttributes: ExtensionNSAttributes
): ExtensionNSAttributes {
  return Object.keys(eNsAttributes)
    .sort()
    .reduce((accURIs: ExtensionNSAttributes, key) => {
      const eNsAttribute = eNsAttributes[key];

      const sortedENsAttribute = Object.keys(eNsAttribute)
        .sort()
        .reduce((accAttributes: Record<string, string | null>, key) => {
          accAttributes[key] = eNsAttribute[key];

          return accAttributes;
        }, {});

      accURIs[key] = sortedENsAttribute;

      return accURIs;
    }, {});
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

  const eNsAttributes: ExtensionNSAttributes = {};
  Array.from(element.attributes).forEach((attr) => {
    if (attr.namespaceURI) {
      if (!eNsAttributes[attr.namespaceURI])
        eNsAttributes[attr.namespaceURI] = {};

      eNsAttributes[attr.namespaceURI][attr.name] = attr.value;
    }
  });
  baseElement.eNSAttributes = sortENsAttributes(eNsAttributes);

  return baseElement;
}
