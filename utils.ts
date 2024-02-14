import { DADescription } from "./describe/DADescription.js";
import { DODescription } from "./describe/DODescription.js";
import { ReportControlDescription } from "./describe/ReportControl.js";
import { SDODescription } from "./describe/SDODescription.js";

type SortedObjects =
  | DADescription
  | SDODescription
  | ReportControlDescription
  | DODescription;

/** @returns Alphabetically sorted object keys */
export function sortRecord(object: Record<string, SortedObjects>) {
  return Object.keys(object)
    .sort()
    .reduce((sortedRecord: Record<string, SortedObjects>, key) => {
      sortedRecord[key] = object[key];

      return sortedRecord;
    }, {});
}

/** @returns DOType/DAType/EnumType reference by the elements type attribute */
export function referencedDataType(element: Element): Element | undefined {
  const elementType = element.getAttribute("type");
  return Array.from(element.closest("DataTypeTemplates")?.children ?? []).find(
    (sibling) => sibling.getAttribute("id") === elementType,
  )!;
}
