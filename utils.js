/** @returns Alphabetically sorted object keys */
export function sortRecord(object) {
    return Object.keys(object)
        .sort()
        .reduce((sortedRecord, key) => {
        sortedRecord[key] = object[key];
        return sortedRecord;
    }, {});
}
/** @returns DOType/DAType/EnumType reference by the elements type attribute */
export function referencedDataType(element) {
    const elementType = element.getAttribute("type");
    return Array.from(element.closest("DataTypeTemplates")?.children ?? []).find((sibling) => sibling.getAttribute("id") === elementType);
}
//# sourceMappingURL=utils.js.map