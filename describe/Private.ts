export type PrivateDescription = string;

export function Private(element: Element): PrivateDescription {
  // TODO(#14): canonicalize the XML string
  return element.outerHTML;
}
