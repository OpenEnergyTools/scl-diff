/** Sort `ValDescription` by `sGroup` attribute */
export function compareBySGroup(a: ValDescription, b: ValDescription): number {
  if (!a.sGroup || !b.sGroup) return 0;
  else if (a.sGroup < b.sGroup) return -1;

  return 1;
}

export interface ValDescription {
  /** Optional Val attribute sGroup */
  sGroup?: number;
  /** Val elements text content defaulting to "" */
  val: string;
}

export function describeVal(element: Element): ValDescription {
  const valDesc: ValDescription = { val: "" };
  if (
    element.getAttribute("sGroup") &&
    !isNaN(parseInt(element.getAttribute("sGroup")!, 10))
  )
    valDesc.sGroup = parseInt(element.getAttribute("sGroup")!, 10);

  valDesc.val = element.textContent ?? "";

  return valDesc;
}
