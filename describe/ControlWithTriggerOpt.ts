import { ControlDescription, describeControl } from "./Control.js";

type TrgOps = {
  /** TrgOpts attribute dchg defaulting to false*/
  dchg: boolean;
  /** TrgOpts attribute qchg defaulting to false*/
  qchg: boolean;
  /** TrgOpts attribute dupt defaulting to false*/
  dupd: boolean;
  /** TrgOpts attribute period defaulting to false*/
  period: boolean;
  /** TrgOpts attribute gi defaulting to false*/
  gi: boolean;
};

export interface ControlWithTriggerOptDescription extends ControlDescription {
  trgOps: TrgOps;
  /** ReportControl attribute intgPd defaulted to 0 */
  intgPd: number;
}

function trgOps(element: Element): TrgOps {
  const trgOps = Array.from(element.children).find(
    (child) => child.tagName === "TrgOps"
  );
  if (!trgOps)
    return { dchg: false, qchg: false, dupd: false, period: false, gi: false };

  const [dchg, qchg, dupd, period, gi] = [
    "dchg",
    "qchg",
    "dupd",
    "period",
    "gi",
  ].map((attr) => (trgOps.getAttribute(attr) === "true" ? true : false));

  return { dchg, qchg, dupd, period, gi };
}

export function describeControlWithTriggerOpt(
  element: Element
): ControlWithTriggerOptDescription | undefined {
  const controlDescription = describeControl(element);
  if (!controlDescription) return;

  const controlWithTriggerOptDesc = {
    ...controlDescription,
    trgOps: trgOps(element),
    intgPd: 0,
  };

  const intgPd = element.getAttribute("intgPd");
  if (intgPd && !isNaN(parseInt(intgPd, 10)))
    controlWithTriggerOptDesc.intgPd = parseInt(intgPd, 10);

  return controlWithTriggerOptDesc;
}
