import {
  ControlWithTriggerOptDescription,
  describeControlWithTriggerOpt,
} from "./ControlWithTriggerOpt.js";

export interface LogControlDescription
  extends ControlWithTriggerOptDescription {
  /** ReportControl attribute ldInst.  */
  ldInst: string | null;
  /** LogControl attribute prefix defaulted to "". */
  prefix: string;
  /** LogControl attribute lnClass defaulted to "LLN0". */
  lnClass: string;
  /** LogControl attribute lnInst. */
  lnInst: string | null;
  /** LogControl attribute logName. Must point to valid `Log` element */
  logName: string;
  /** LogControl attribute logEna defaulted to true. */
  logEna: boolean;
  /** LogControl attribute reasonCode defaulted to true. */
  reasonCode: boolean;
  /** LogCOntrol attribute bufTime defaulted to "0".  */
  bufTime: number;
}

export function describeLogControl(
  element: Element,
): LogControlDescription | undefined {
  const controlWithTriggerOptDesc = describeControlWithTriggerOpt(element);
  if (!controlWithTriggerOptDesc) return;

  const logName = element.getAttribute("logName");
  if (!logName) return;

  const logControlDescription: LogControlDescription = {
    ...controlWithTriggerOptDesc,
    ldInst: element.getAttribute("ldInst"),
    prefix: element.getAttribute("prefix") ?? "",
    lnClass: element.getAttribute("lnClass") ?? "LLN0",
    lnInst: element.getAttribute("lnInst"),
    logEna: element.getAttribute("logEna") === "false" ? false : true,
    reasonCode: element.getAttribute("reasonCode") === "false" ? false : true,
    bufTime: 0,
    logName,
  };

  const bufTime = element.getAttribute("bufTime");
  if (bufTime && !isNaN(parseInt(bufTime, 10)))
    logControlDescription.bufTime = parseInt(bufTime, 10);

  return logControlDescription;
}
