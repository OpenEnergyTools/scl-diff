import {
  ControlWithIEDNameDescription,
  describeControlWithIEDName,
} from "./ControlWithIEDName.js";

type SmvOpts = {
  /** SmvOpts attribute refreshTime defaulted to false */
  refreshTime: boolean;
  /** SmvOpts attribute sampleSynchronized defaulted to true */
  sampleSynchronized: boolean;
  /** SmvOpts attribute sampleRate defaulted to false */
  sampleRate: boolean;
  /** SmvOpts attribute dataSet defaulted to false */
  dataSet: boolean;
  /** SmvOpts attribute security defaulted to false */
  security: boolean;
  /** SmvOpts attribute timestamp defaulted to false */
  timestamp: boolean;
  /** SmvOpts attribute synchSourceId defaulted to false */
  synchSourceId: boolean;
};

function smvOpts(element: Element): SmvOpts | undefined {
  const smvOpts = element.querySelector(":scope > SmvOpts");
  if (!smvOpts) return;

  const some: SmvOpts = {
    refreshTime: smvOpts.getAttribute("refreshTime") === "true" ? true : false,
    sampleSynchronized:
      smvOpts.getAttribute("sampleSynchronized") === "false" ? false : true,
    sampleRate: smvOpts.getAttribute("sampleRate") === "true" ? true : false,
    dataSet: smvOpts.getAttribute("dataSet") === "true" ? true : false,
    security: smvOpts.getAttribute("security") === "true" ? true : false,
    timestamp: smvOpts.getAttribute("timestamp") === "true" ? true : false,
    synchSourceId:
      smvOpts.getAttribute("synchSourceId") === "true" ? true : false,
  };

  return some;
}

export interface SampledValueControlDescription
  extends ControlWithIEDNameDescription {
  /** SampledValueControl attribute multicast defaulted to true */
  multicast: boolean;
  /** SampledValueControl attribute smvID */
  smvID: string;
  /** SampledValueControl attribute smpRate*/
  smpRate: number;
  /** SampledValueControl attribute nofASDU */
  nofASDU: number;
  /** SampledValueControl attribute smpMod defaulted to "SmpPerPeriod" */
  smpMod: "SmpPerPeriod" | "SmpPerSec" | "SecPerSmp";
  /** SampleValueControl attribute securityEnable defaulted to "None" */
  securityEnable: "None" | "Signature" | "SignatureAndEncryption";
  /** SampledValueControl child Protocol */
  protocol?: { mustUnderstand: true; val: "R-SV" };
  /** SampledValueControl child SmvOpts */
  SmvOpts: SmvOpts;
}

export function describeSampledValueControl(
  element: Element
): SampledValueControlDescription | undefined {
  const controlWithTriggerOptDesc = describeControlWithIEDName(element);
  if (!controlWithTriggerOptDesc) return;

  const smpRate = element.getAttribute("smpRate");
  if (!smpRate || isNaN(parseInt(smpRate, 10))) return;

  const nofASDU = element.getAttribute("nofASDU");
  if (!nofASDU || isNaN(parseInt(nofASDU, 10))) return;

  const SmvOpts = smvOpts(element);
  if (!SmvOpts) return;

  const gseControlDescription: SampledValueControlDescription = {
    ...controlWithTriggerOptDesc,
    multicast: element.getAttribute("multicast") === "false" ? false : true,
    smvID: element.getAttribute("smvID") ?? "",
    smpRate: parseInt(smpRate, 10),
    nofASDU: parseInt(nofASDU, 10),
    smpMod: element.getAttribute("smpMod")
      ? (element.getAttribute("smpMod") as
          | "SecPerSmp"
          | "SmpPerSec"
          | "SmpPerPeriod")
      : "SmpPerPeriod",
    securityEnable: element.getAttribute("securityEnable")
      ? (element.getAttribute("securityEnable") as
          | "Signature"
          | "SignatureAndEncryption")
      : "None",
    SmvOpts: SmvOpts,
  };

  const protocol = Array.from(element.children).find(
    (child) => child.tagName === "Protocol"
  );
  if (protocol)
    gseControlDescription.protocol = { mustUnderstand: true, val: "R-SV" };

  return gseControlDescription;
}
