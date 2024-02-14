// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isProtNsDescription(type: any): type is ProtNsDescription {
  return "type" in type && "val" in type;
}

export interface ProtNsDescription {
  /** Type of namespace defaulting to "8-MMS" */
  type: string;
  /** ProtNs textContent defaulting to "" */
  val: string;
}

export function describeProtNs(element: Element): ProtNsDescription {
  const protNsDesc: ProtNsDescription = {
    type: "8-MMS",
    val: element.textContent ?? "",
  };

  if (element.getAttribute("type"))
    protNsDesc.type = element.getAttribute("type")!;

  return protNsDesc;
}
