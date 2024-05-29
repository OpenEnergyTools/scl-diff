import { AccessPoint } from "./describe/AccessPoint.js";
import { IED } from "./describe/IED.js";
import { Private } from "./describe/Private.js";
import { Text } from "./describe/Text.js";
import { EnumType } from "./describe/EnumType.js";
import { DAType } from "./describe/DAType.js";
import { DOType } from "./describe/DOType.js";
import { LDevice } from "./describe/LDevice.js";
import { LNodeType } from "./describe/LNodeType.js";
import { LN } from "./describe/LN.js";
import { LN0 } from "./describe/LN0.js";
import { Server } from "./describe/Server.js";
import { Services } from "./describe/Services.js";
const sclElementDescriptors = {
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
    IED,
};
export function describe(element) {
    return sclElementDescriptors[element.tagName]?.(element);
}
//# sourceMappingURL=describe.js.map