import { AccessPoint, AccessPointDescription } from "./describe/AccessPoint.js";
import { Private, PrivateDescription } from "./describe/Private.js";
import { Text, TextDescription } from "./describe/Text.js";
import { EnumType, EnumTypeDescription } from "./describe/EnumType.js";
import { DAType, DATypeDescription } from "./describe/DAType.js";
import { DOType, DOTypeDescription } from "./describe/DOType.js";
import { LDevice, LDeviceDescription } from "./describe/LDevice.js";
import { LNodeType, LNodeTypeDescription } from "./describe/LNodeType.js";
import { LN, LNDescription } from "./describe/LN.js";
import { LN0, LN0Description } from "./describe/LN0.js";
import { Server, ServerDescription } from "./describe/Server.js";
import { Services, ServicesDescription } from "./describe/Services.js";

export type Description =
  | PrivateDescription
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  | TextDescription // FIXME: duplication to PrivateDescription
  | EnumTypeDescription
  | DATypeDescription
  | DOTypeDescription
  | LNodeTypeDescription
  | LNDescription
  | LN0Description
  | LDeviceDescription
  | ServerDescription
  | ServicesDescription
  | AccessPointDescription;
const sclElementDescriptors: Partial<
  Record<string, (element: Element) => Description | undefined>
> = {
  Private,
  Text,
  EnumType,
  DAType,
  DOType,
  LNodeType,
  LN,
  LN0,
  LDevice,
  Server,
  Services,
  AccessPoint,
};

export function describe(element: Element): Description | undefined {
  return sclElementDescriptors[element.tagName]?.(element);
}
