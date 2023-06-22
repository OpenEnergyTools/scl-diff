export type TextDescription = string;

export function Text(element: Element): TextDescription {
  // TODO(#14): canonicalize the XML string
  return element.outerHTML;
}
