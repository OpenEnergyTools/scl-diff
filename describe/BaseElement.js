import { Private } from "./Private.js";
import { Text } from "./Text.js";
function sortENsAttributes(eNsAttributes) {
    return Object.keys(eNsAttributes)
        .sort()
        .reduce((accURIs, key) => {
        const eNsAttribute = eNsAttributes[key];
        const sortedENsAttribute = Object.keys(eNsAttribute)
            .sort()
            .reduce((accAttributes, key) => {
            accAttributes[key] = eNsAttribute[key];
            return accAttributes;
        }, {});
        accURIs[key] = sortedENsAttribute;
        return accURIs;
    }, {});
}
export function describeBaseElement(element) {
    const baseElement = {
        privates: [],
        texts: [],
        eNSAttributes: {},
    };
    Array.from(element.children).forEach((child) => {
        if (child.tagName === "Private")
            baseElement.privates.push(Private(child));
        if (child.tagName === "Text")
            baseElement.texts.push(Text(child));
    });
    const eNsAttributes = {};
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
//# sourceMappingURL=BaseElement.js.map