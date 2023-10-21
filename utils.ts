import { DADescription } from "./describe/DADescription.js";
import { DODescription } from "./describe/DODescription.js";
import { GSEControlDescription } from "./describe/GSEControl.js";
import { LNDescription } from "./describe/LN.js";
import { LogControlDescription } from "./describe/LogControl.js";
import { NamingDescription } from "./describe/Naming.js";
import { ReportControlDescription } from "./describe/ReportControl.js";
import { SDODescription } from "./describe/SDODescription.js";
import { SampledValueControlDescription } from "./describe/SampledValueControl.js";

type SortedObjects =
  | DADescription
  | GSEControlDescription
  | LNDescription
  | LogControlDescription
  | NamingDescription
  | SampledValueControlDescription
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
