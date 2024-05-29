import { DataSetDescription, describeDataSet } from "./DataSetDescription.js";
import { NamingDescription, describeNaming } from "./Naming.js";

export interface ControlDescription extends NamingDescription {
  dataSet?: DataSetDescription;
}

export function describeControl(
  element: Element,
): ControlDescription | undefined {
  const datSet = element.getAttribute("datSet");
  if (!datSet) return { ...describeNaming(element) };

  const dataSet = Array.from(element.parentElement?.children ?? []).find(
    (child) =>
      child.tagName === "DataSet" &&
      child.getAttribute("name") &&
      child.getAttribute("name") === datSet,
  );
  if (!dataSet) return;

  const dataSetDescription = describeDataSet(dataSet);
  if (!dataSetDescription) return;

  return { ...describeNaming(element), dataSet: dataSetDescription };
}
