export function isProtNsDescription(type) {
    return "type" in type && "val" in type;
}
export function describeProtNs(element) {
    const protNsDesc = {
        type: "8-MMS",
        val: element.textContent || "",
    };
    if (element.getAttribute("type"))
        protNsDesc.type = element.getAttribute("type");
    return protNsDesc;
}
//# sourceMappingURL=ProtNs.js.map