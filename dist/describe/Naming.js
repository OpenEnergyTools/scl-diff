import { describeBaseElement } from "./BaseElement.js";
export function describeNaming(element) {
    const idNameDescription = {
        ...describeBaseElement(element),
    };
    if (element.getAttribute("desc"))
        idNameDescription.desc = element.getAttribute("desc");
    return idNameDescription;
}
//# sourceMappingURL=Naming.js.map