/** @returns Alphabetically sorted object keys */
export function sortRecord(object: Record<string, any>) {
  return Object.keys(object)
    .sort()
    .reduce((sortedRecord: Record<string, any>, key) => {
      sortedRecord[key] = object[key];

      return sortedRecord;
    }, {});
}

/** @returns DOType/DAType/EnumType reference by the elements type attribute */
export function referencedDataType(element: Element): Element | undefined {
  const elementType = element.getAttribute("type");
  return Array.from(element.closest("DataTypeTemplates")?.children ?? []).find(
    (sibling) => sibling.getAttribute("id") === elementType
  )!;
}
