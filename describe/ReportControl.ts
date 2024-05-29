import {
  ControlWithTriggerOptDescription,
  describeControlWithTriggerOpt,
} from "./ControlWithTriggerOpt.js";

interface Client {
  /** ClientLN attribute iedName */
  iedName: string;
  /** ClientLN attribute apRef (optional for reverse compatibility)*/
  apRef?: string;
  /** ClientLN attribute ldInst */
  ldInst: string;
  /** ClientLN attribute prefix defaulting to "" */
  prefix: string;
  /** ClientLN attribute lnClass */
  lnClass: string;
  /** ClientLN attribute lnInst defaulting to "" */
  lnInst: string;
}

interface OptFields {
  /** OptFields attribute seqNum defaulting to false*/
  seqNum: boolean;
  /** OptFields attribute timeStamp defaulting to false*/
  timeStamp: boolean;
  /** OptFields attribute dataSet defaulting to false*/
  dataSet: boolean;
  /** OptFields attribute reasonCode defaulting to false*/
  reasonCode: boolean;
  /** OptFields attribute dataRef defaulting to false*/
  dataRef: boolean;
  /** OptFields attribute entryID defaulting to false*/
  entryID: boolean;
  /** OptFields attribute configRef defaulting to false*/
  configRef: boolean;
  /** OptFields attribute bufOvfl defaulting to false*/
  bufOvfl: boolean;
}

export interface ReportControlDescription
  extends ControlWithTriggerOptDescription {
  /** ReportControl attribute index defaulted to true */
  indexed: boolean;
  /** ReportControl attribute bufTime defaulted to 0 */
  bufTime: number;
  /** ReportControl attribute buffered defaulted to false */
  buffered: boolean;
  /** ReportControl attribute confRev defaulted to 0 */
  confRev: number;
  /** ReportControl attribute rptID */
  rptID?: string;
  /** ReportControl child element OptFields */
  optFields: OptFields;
  /** Child RptEnabled max attribute */
  maxClients: number;
  /** Child element ClientLN  */
  clients: Client[];
}

function clients(element: Element): { maxClients: number; clients: Client[] } {
  const rptEnabled = Array.from(element.children).find(
    (child) => child.tagName === "RptEnabled",
  );
  if (!rptEnabled) return { maxClients: 0, clients: [] };

  const clients = Array.from(rptEnabled.children)
    .filter((child) => child.tagName === "ClientLN")
    .map((clientLn) => {
      const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = [
        "iedName",
        "apRef",
        "ldInst",
        "prefix",
        "lnClass",
        "lnInst",
      ].map((attr) => clientLn.getAttribute(attr));

      if (!iedName || !ldInst || !lnClass) return undefined;
      const lnGroup = {
        iedName,
        ldInst,
        prefix: prefix ?? "",
        lnClass,
        lnInst: lnInst ?? "",
      };
      if (!apRef) return lnGroup;

      return { ...lnGroup, apRef };
    })
    .filter((clientLn) => clientLn) as Client[];

  return { maxClients: 0, clients };
}

function optFields(element: Element): OptFields {
  const optFields = Array.from(element.children).find(
    (child) => child.tagName === "OptFields",
  );

  if (!optFields)
    return {
      seqNum: false,
      timeStamp: false,
      dataSet: false,
      reasonCode: false,
      dataRef: false,
      entryID: false,
      configRef: false,
      bufOvfl: false,
    };

  const [
    seqNum,
    timeStamp,
    dataSet,
    reasonCode,
    dataRef,
    entryID,
    configRef,
    bufOvfl,
  ] = [
    "seqNum",
    "timeStamp",
    "dataSet",
    "reasonCode",
    "dataRef",
    "entryID",
    "configRef",
    "bufOvfl",
  ].map((attr) => (element.getAttribute(attr) ? true : false));

  return {
    seqNum,
    timeStamp,
    dataSet,
    reasonCode,
    dataRef,
    entryID,
    configRef,
    bufOvfl,
  };
}

export function describeReportControl(
  element: Element,
): ReportControlDescription | undefined {
  const controlWithTriggerOptDesc = describeControlWithTriggerOpt(element);
  if (!controlWithTriggerOptDesc) return;

  const reportControlDescription: ReportControlDescription = {
    ...controlWithTriggerOptDesc,
    indexed: element.getAttribute("indexed") === "false" ? false : true,
    bufTime: 0,
    buffered: element.getAttribute("buffered") === "false" ? false : true,
    confRev: 0,
    optFields: optFields(element),
    ...clients(element),
  };

  const bufTime = element.getAttribute("bufTime");
  if (bufTime && !isNaN(parseInt(bufTime, 10)))
    reportControlDescription.bufTime = parseInt(bufTime, 10);

  const confRev = element.getAttribute("confRev");
  if (confRev && !isNaN(parseInt(confRev, 10)))
    reportControlDescription.confRev = parseInt(confRev, 10);

  return reportControlDescription;
}
