import { sortRecord } from "../utils.js";
import { AbstractDataAttributeDescription } from "./AbstractDataAttribute.js";
import { DADescription } from "./DADescription.js";
import { DATypeDescription } from "./DAType.js";
import { DOTypeDescription, isDOTypeDescription } from "./DOType.js";
import {
  LNodeType,
  LNodeTypeDescription,
  isLNodeTypeDescription,
} from "./LNodeType.js";
import { LogControlDescription, describeLogControl } from "./LogControl.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import { InputsDescription, describeInputs } from "./Inputs.js";
import {
  ReportControlDescription,
  describeReportControl,
} from "./ReportControl.js";
import { describeVal, compareBySGroup } from "./Val.js";

export interface LNDescription extends NamingDescription {
  reports: Record<string, ReportControlDescription>;
  logControls: Record<string, LogControlDescription>;
  inputs?: InputsDescription;
  lnType: LNodeTypeDescription;
}

function reportControls(
  element: Element,
): Record<string, ReportControlDescription> {
  const unsortedReports: Record<string, ReportControlDescription> = {};

  Array.from(element.children)
    .filter((child) => child.tagName === "ReportControl")
    .forEach((reportControl) => {
      const name = reportControl.getAttribute("name");
      const reportDescription = describeReportControl(reportControl);
      if (name && !unsortedReports[name] && reportDescription)
        unsortedReports[name] = reportDescription;
    });

  return sortRecord(unsortedReports) as Record<
    string,
    ReportControlDescription
  >;
}

function getNextDataType(
  dataType: LNodeTypeDescription | DOTypeDescription | DATypeDescription,
  path: string[],
  index = 0,
): DADescription | AbstractDataAttributeDescription | undefined {
  if (isLNodeTypeDescription(dataType))
    if (dataType.dos[path[index]]?.type)
      return getNextDataType(dataType.dos[path[index]].type, path, ++index);
    else return;
  else if (isDOTypeDescription(dataType))
    if (dataType.sdos[path[index]])
      return getNextDataType(dataType.sdos[path[index]].type, path, ++index);
    else if (dataType.das[path[index]]?.bType === "Struct")
      return getNextDataType(
        dataType.das[path[index]].type as DATypeDescription,
        path,
        ++index,
      );
    else return dataType.das[path[index]];
  else if (dataType.bdas[path[index]].bType === "Struct")
    return getNextDataType(
      dataType.bdas[path[index]].type as DATypeDescription,
      path,
      ++index,
    );
  else return dataType.bdas[path[index]];
}

function logControls(element: Element): Record<string, LogControlDescription> {
  const unsortedLogControls: Record<string, LogControlDescription> = {};

  Array.from(element.children)
    .filter((child) => child.tagName === "LogControl")
    .forEach((logControl) => {
      const name = logControl.getAttribute("name");
      const logControlDescription = describeLogControl(logControl);
      if (name && !unsortedLogControls[name] && logControlDescription)
        unsortedLogControls[name] = logControlDescription;
    });

  return sortRecord(unsortedLogControls) as Record<
    string,
    LogControlDescription
  >;
}

/** Returns leaf data attribute (BDA or DA) from
 * LNodeTypeDescription containing vals
 * @param path - parent DOI/SDI/DAI name attributes
 * @param lNodeType - LNodeTypeDescription of the logical node
 * */
function getLeafDataAttribute(
  path: string[],
  lNodeType: LNodeTypeDescription,
): AbstractDataAttributeDescription | DADescription | undefined {
  return getNextDataType(lNodeType, path, 0);
}

function updateValues(
  lNodeType: LNodeTypeDescription,
  instanceValues: Record<string, Element[]>,
): LNodeTypeDescription {
  Object.entries(instanceValues).forEach(([key, value]) => {
    const leafDataAttribute = getLeafDataAttribute(key.split("."), lNodeType);

    if (leafDataAttribute)
      (leafDataAttribute as AbstractDataAttributeDescription).vals = value
        .map((val) => describeVal(val))
        .sort(compareBySGroup);
  });

  return lNodeType;
}

/** Path consisting of parents name attributes: e.g. ["Beh","stVal"] */
function pathToInstanceValue(element: Element): string[] | undefined {
  if (element.tagName === "LN" || element.tagName === "LN0") return [];

  const parent = element.parentElement!;

  if (element.tagName === "Val") return pathToInstanceValue(parent);

  const parentPath = pathToInstanceValue(parent);
  const name = element.getAttribute("name");

  return parentPath && name ? [...parentPath, name] : undefined;
}

function instanceValues(ln: Element): Record<string, Element[]> {
  const vals = ln.querySelectorAll("Val");

  const instanceValues: Record<string, Element[]> = {};
  vals.forEach((valElement) => {
    const path = pathToInstanceValue(valElement)?.join(".");
    if (path && instanceValues[path]) instanceValues[path].push(valElement);
    if (path && !instanceValues[path]) instanceValues[path] = [valElement];
  });

  return instanceValues;
}

export function LN(element: Element): LNDescription | undefined {
  const lNodeType = element.ownerDocument.querySelector(
    `DataTypeTemplates > LNodeType[id="${element.getAttribute("lnType")}"]`,
  );
  if (!lNodeType) return;

  const lNodeTypeDescriptions = LNodeType(lNodeType);
  if (!lNodeTypeDescriptions) return;

  const lnType = updateValues(lNodeTypeDescriptions, instanceValues(element));

  const lnDescription: LNDescription = {
    ...describeNaming(element),
    reports: reportControls(element),
    logControls: logControls(element),
    lnType,
  };

  const inputs = Array.from(element.children).find(
    (child) => child.tagName === "Inputs",
  );
  if (inputs) lnDescription.inputs = describeInputs(inputs);

  return lnDescription;
}
