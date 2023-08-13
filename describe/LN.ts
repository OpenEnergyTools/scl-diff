import { sortRecord } from "../utils.js";
import { AbstractDataAttributeDescription } from "./AbstractDataAttribute.js";
import { LNodeType, LNodeTypeDescription } from "./LNodeType.js";
import { NamingDescription, describeNaming } from "./Naming.js";
import {
  ReportControlDescription,
  describeReportControl,
} from "./ReportControl.js";
import { describeVal, compareBySGroup } from "./Val.js";

export interface LNDescription extends NamingDescription {
  reports: Record<string, ReportControlDescription>;
  lnType: LNodeTypeDescription;
}

function reportControls(
  element: Element
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

  return sortRecord(unsortedReports);
}

/** Returns leaf data attribute (BDA or DA) from
 * LNodeTypeDescription containing vals
 * @param path - parent DOI/SDI/DAI name attributes
 * @param lNodeType - LNodeTypeDescription of the logical node
 * */
function getLeafDataAttribute(
  path: string[],
  lNodeType: LNodeTypeDescription
): Object | undefined {
  let index = 0;
  let dataType: any = lNodeType;

  while (path.length > index) {
    if (dataType.dos)
      // LNodeType->DO
      dataType = dataType.dos[path[index]].type;
    else if (dataType.sdos || dataType.das) {
      // DOType
      if (dataType.sdos[path[index]])
        //SDO
        dataType = dataType.sdos[path[index]].type;
      else if (dataType.das[path[index]]) {
        //DA
        const da = dataType.das[path[index]];
        if (da.bType === "Struct") dataType = da.type;
        else return da;
      }
    } else {
      // DAType->BDA
      const bda = dataType.bdas[path[index]];
      if (bda.bType === "Struct") dataType = bda.type;
      else return bda;
    }
    index++;
  }
}

function updateValues(
  lNodeType: LNodeTypeDescription,
  instanceValues: Record<string, Element[]>
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
    `DataTypeTemplates > LNodeType[id="${element.getAttribute("lnType")}"]`
  );
  if (!lNodeType) return;

  const lNodeTypeDescriptions = LNodeType(lNodeType);
  if (!lNodeTypeDescriptions) return;

  const lnType = updateValues(lNodeTypeDescriptions, instanceValues(element));

  return {
    ...describeNaming(element),
    lnType,
    reports: reportControls(element),
  };
}
