import {
  ControlWithIEDNameDescription,
  describeControlWithIEDName,
} from "./ControlWithIEDName.js";

export interface GSEControlDescription extends ControlWithIEDNameDescription {
  /** GSEControl attribute type defaulted to "GOOSE" */
  type: "GOOSE" | "GSSE";
  /** GSEControl attribute appId */
  appID: string;
  /** GSEControl attribute fixedOffs defaulted to false */
  fixedOffs: boolean;
  /** GSEControl attribute securityEnable defaulted to "None" */
  securityEnable: "None" | "Signature" | "SignatureAndEncryption";
  /**GSEControl child Protocol*/
  protocol?: { mustUnderstand: true; val: "R-GOOSE" };
}

export function describeGSEControl(
  element: Element,
): GSEControlDescription | undefined {
  const controlWithTriggerOptDesc = describeControlWithIEDName(element);
  if (!controlWithTriggerOptDesc) return;

  const gseControlDescription: GSEControlDescription = {
    ...controlWithTriggerOptDesc,
    type: element.getAttribute("type") === "GSSE" ? "GSSE" : "GOOSE",
    appID: element.getAttribute("appID") ?? "",
    fixedOffs: element.getAttribute("fixedOffs") === "true" ? true : false,
    securityEnable: element.getAttribute("securityEnable")
      ? (element.getAttribute("securityEnable") as
          | "Signature"
          | "SignatureAndEncryption")
      : "None",
  };

  const protocol = Array.from(element.children).find(
    (child) => child.tagName === "Protocol",
  );
  if (protocol)
    gseControlDescription.protocol = { mustUnderstand: true, val: "R-GOOSE" };

  return gseControlDescription;
}
