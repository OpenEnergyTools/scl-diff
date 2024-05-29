interface CommProt {
  /** attribute ipv6 defaulting to false */
  ipv6: boolean;
}

interface RedProt {
  /** attribute hsr defaulting to false */
  hsr: boolean;
  /** attribute prp defaulting to false */
  prp: boolean;
  /** attribute rstp defaulting to false */
  rstp: boolean;
}

interface ValueHandling {
  /** attribute setToRO defaulting to true */
  setToRO: boolean;
}

interface SupSubscription {
  /** attribute maxGo */
  maxGo: number;
  /** attribute maxSv */
  maxSv: number;
}

interface TimeSyncProt {
  /** attribute sntp defaulting to true */
  sntp: boolean;
  /** attribute iec61850_9_3 defaulting to false */
  iec61850_9_3: boolean;
  /** attribute c37_238 defaulting to false */
  c37_238: boolean;
  /** attribute other defaulting to false */
  other: boolean;
}

interface ClientServices {
  /** attribute goose defaulting to false */
  goose: boolean;
  /** attribute gsse defaulting to false */
  gsse: boolean;
  /** attribute bufReport defaulting to false */
  bufReport: boolean;
  /** attribute unbufReport defaulting to false */
  unbufReport: boolean;
  /** attribute readLog defaulting to false */
  readLog: boolean;
  /** attribute sv defaulting to false */
  sv: boolean;
  /** attribute supportsLdName defaulting to false */
  supportsLdName: boolean;
  /** attribute maxAttributes */
  maxAttributes?: number;
  /** attribute maxReports */
  maxReports?: number;
  /** attribute maxGOOSE */
  maxGOOSE?: number;
  /** attribute maxSMV */
  maxSMV?: number;
  /** attribute rGOOSE defaulting to false */
  rGOOSE: boolean;
  /** attribute rSV defaulting to false */
  rSV: boolean;
  /** attribute noIctBinding defaulting to false */
  noIctBinding: boolean;
  /** child  McSecurity */
  mcSecurity?: McSecurity;
  /** child  TimeSyncProt */
  timeSyncProt?: TimeSyncProt;
}

interface ConfLNs {
  /** attribute fixPrefix defaulting to false */
  fixPrefix: boolean;
  /** attribute fixLnInst defaulting to false */
  fixLnInst: boolean;
}

interface FileHandling {
  /** attribute mms defaulting to true */
  mms: boolean;
  /** attribute ftp defaulting to false */
  ftp: boolean;
  /** attribute ftps defaulting to false */
  ftps: boolean;
}

interface ServiceWithMax {
  /** ServicesWithMax attributes max */
  max: number;
}

interface SMVsc extends ServiceWithMax {
  /** attribute delivery defaulting to "multicast" */
  delivery: string;
  /** attribute deliveryConf defaulting to false */
  deliveryConf: boolean;
  /** attribute sv defaulting to false */
  sv: boolean;
  /** attribute rSV defaulting to false */
  rSV: boolean;
}

interface GOOSEcapabilities extends ServiceWithMax {
  /** attribute fixedOffs defaulting to false */
  fixedOffs: boolean;
  /** attribute goose defaulting to true */
  goose: boolean;
  /** attribute rGOOSE defaulting to false */
  rGOOSE: boolean;
}

interface McSecurity {
  /** attribute signature defaulting false */
  signature: boolean;
  /** attribute encryption defaulting false */
  encryption: boolean;
}

interface ServiceSettings {
  /** attribute cbName defaulting to "Fix" */
  cbName: string;
  /** attribute datSet defaulting to "Fix" */
  datSet: string;
}

interface SMVSettings extends ServiceSettings {
  /** attribute svID defaulting to "Fix" */
  svID: string;
  /** attribute optFields defaulting to "Fix" */
  optFields: string;
  /** attribute smpRate defaulting to "Fix" */
  smpRate: string;
  /** attribute samplesPerSec defaulting to false */
  samplesPerSec: boolean;
  /** attribute pdcTimeStamp defaulting to false */
  pdcTimeStamp: boolean;
  /** attribute synchSrcId defaulting to false */
  synchSrcId: boolean;
  /** attribute nofASDU defaulting to "Fix" */
  nofASDU: string;
  /** attribute kdaParticipant defaulting to false */
  kdaParticipant: boolean;
  /** children  SmpRate */
  SmpRate: number[];
  /** children SamplesPerSec */
  SamplesPerSec: number[];
  /** children SecPerSamples*/
  SecPerSamples: number[];
  /** child element McSecurity */
  mcSecurity?: McSecurity;
}

interface GSESettings extends ServiceSettings {
  /** attribute appID defaulting to "Fix" */
  appID: string;
  /** attribute dataLabel defaulting to "Fix" */
  dataLabel: string;
  /** attribute kdaParticipant defaulting to false */
  kdaParticipant: boolean;
  /** child element McSecurity */
  mcSecurity?: McSecurity;
}

interface LogSettings extends ServiceSettings {
  /** attribute logEna defaulting to "Fix" */
  logEna: string;
  /** attribute trgOps defaulting to "Fix" */
  trgOps: string;
  /** attribute intgPd defaulting to "Fix" */
  intgPd: string;
}

interface ReportSettings extends ServiceSettings {
  /** attribute rptID defaulting to "Fix" */
  rptID: string;
  /** attribute optFields defaulting to "Fix" */
  optFields: string;
  /** attribute bufTime defaulting to "Fix" */
  bufTime: string;
  /** attribute trgOps defaulting to "Fix" */
  trgOps: string;
  /** attribute intgPd defaulting to "Fix" */
  intgPd: string;
  /** attribute resvTms defaulting to false */
  resvTms: boolean;
  /** attribute owner defaulting to false */
  owner: boolean;
}

interface ServiceConfReportControl extends ServiceWithMax {
  /** bufMode attribute defaulting to both */
  bufMode: string;
  /** bufConf attribute defaulting to false */
  bufConf: boolean;
  /** maxBuf attribute defaulting to max */
  maxBuf: number;
}

interface ServiceWithMaxAndMaxAttributes extends ServiceWithMax {
  maxAttributes?: number;
}

interface ServiceForConfDataSet extends ServiceWithMaxAndMaxAttributes {
  /** ServiceForConfDataSet attributes defaulting to true */
  modify: boolean;
}

interface ResvTms {
  /** resvTms attribute defaulting false */
  resvTms: boolean;
}

interface SettingGroups {
  /** SettingGroups child SGEdit */
  sGEdit?: ResvTms;
  /** SettingGroups child ConfSG */
  confSG?: ResvTms;
}

interface ServiceWithOptionalMax {
  max?: number;
}

export interface ServicesDescription {
  /** Services attribute nameLength defaulting to 32 */
  nameLength: number;
  /** Services child DynAssociation */
  dynAssociation?: ServiceWithOptionalMax;
  /** Services child SettingGroups */
  settingGroups?: SettingGroups;
  /** Services child GetDirectory */
  getDirectory: boolean;
  /** Services child GetDataObjectDefinition */
  getDataObjectDefinition: boolean;
  /** Services child DataObjectDirectory */
  dataObjectDirectory: boolean;
  /** Services child GetDataSetValue */
  getDataSetValue: boolean;
  /** Services child SetDataSetValue */
  setDataSetValue: boolean;
  /** Services child DataSetDirectory */
  dataSetDirectory: boolean;
  /** Services child ConfDataSet */
  confDataSet?: ServiceForConfDataSet;
  /** Services child DynDataSet */
  dynDataSet?: ServiceWithMaxAndMaxAttributes;
  /** Services child ReadWrite */
  readWrite: boolean;
  /** Services child TimerActivatedControl */
  timerActivatedControl: boolean;
  /** Services child ConfReportControl */
  confReportControl?: ServiceConfReportControl;
  /** Services child GetCBValues */
  getCBValues: boolean;
  /** Services child ConfLogControl */
  confLogControl?: ServiceWithMax;
  /** Services child ReportSettings */
  reportSettings?: ReportSettings;
  /** Services child LogSettings */
  logSettings?: LogSettings;
  /** Services child GSESettings */
  gSESettings?: GSESettings;
  /** Services child SMVSettings */
  sMVSettings?: SMVSettings;
  /** Services child GSEDir */
  gSEDir: boolean;
  /** Services child GOOSE */
  gOOSE?: GOOSEcapabilities;
  /** Services child SMVsc */
  sMVsc?: SMVsc;
  /** Services child FileHandling */
  fileHandling?: FileHandling;
  /** Services child ConfLNs */
  confLNs?: ConfLNs;
  /** Services child ClientServices */
  clientServices?: ClientServices;
  /** Services child ConfLdName */
  confLdName: boolean;
  /** Services child SupSubscription */
  supSubscription?: SupSubscription;
  /** Services child ConfSigRef */
  confSigRef?: ServiceWithMax;
  /** Services child ValueHandling */
  valueHandling?: ValueHandling;
  /** Services child RedProt */
  redProt?: RedProt;
  /** Services child TimeSyncProt */
  timeSyncProt?: TimeSyncProt;
  /** Services child CommProt */
  commProt?: CommProt;
}

function commProt(element: Element): CommProt {
  return {
    ipv6: element.getAttribute("ipv6") === "true" ? true : false,
  };
}

function redProt(element: Element): RedProt {
  return {
    hsr: element.getAttribute("hsr") === "true" ? true : false,
    prp: element.getAttribute("prp") === "true" ? true : false,
    rstp: element.getAttribute("rstp") === "true" ? true : false,
  };
}

function valueHandling(element: Element): ValueHandling {
  return {
    setToRO: element.getAttribute("setToRO") === "true" ? true : false,
  };
}

function supSubscription(element: Element): SupSubscription {
  return {
    maxGo: parseInt(element.getAttribute("maxGo") ?? "0", 10),
    maxSv: parseInt(element.getAttribute("maxSv") ?? "0", 10),
  };
}

function timeSyncProt(element: Element): TimeSyncProt {
  return {
    sntp: element.getAttribute("sntp") === "false" ? false : true,
    iec61850_9_3:
      element.getAttribute("iec61850_9_3") === "true" ? true : false,
    c37_238: element.getAttribute("c37_238") === "true" ? true : false,
    other: element.getAttribute("other") === "true" ? true : false,
  };
}

function clientServices(element: Element): ClientServices {
  const clientServices: ClientServices = {
    goose: element.getAttribute("goose") === "true" ? true : false,
    gsse: element.getAttribute("gsse") === "true" ? true : false,
    bufReport: element.getAttribute("bufReport") === "true" ? true : false,
    unbufReport: element.getAttribute("unbufReport") === "true" ? true : false,
    readLog: element.getAttribute("readLog") === "true" ? true : false,
    sv: element.getAttribute("sv") === "true" ? true : false,
    supportsLdName:
      element.getAttribute("supportsLdName") === "true" ? true : false,
    rGOOSE: element.getAttribute("rGOOSE") === "true" ? true : false,
    rSV: element.getAttribute("rSV") === "true" ? true : false,
    noIctBinding:
      element.getAttribute("noIctBinding") === "true" ? true : false,
  };

  const maxAttributes = element.getAttribute("maxAttributes");
  if (maxAttributes) clientServices.maxAttributes = parseInt(maxAttributes, 10);

  const maxReports = element.getAttribute("maxReports");
  if (maxReports) clientServices.maxReports = parseInt(maxReports, 10);

  const maxGOOSE = element.getAttribute("maxGOOSE");
  if (maxGOOSE) clientServices.maxGOOSE = parseInt(maxGOOSE, 10);

  const maxSMV = element.getAttribute("maxSMV");
  if (maxSMV) clientServices.maxSMV = parseInt(maxSMV, 10);

  const mcSecurityElement = element.querySelector(":scope > McSecurity");
  if (mcSecurityElement)
    clientServices.mcSecurity = mcSecurity(mcSecurityElement);

  const timeSyncProtElement = element.querySelector(":scope > TimeSyncProt");
  if (timeSyncProtElement)
    clientServices.timeSyncProt = timeSyncProt(timeSyncProtElement);

  return clientServices;
}

function confLNs(element: Element): ConfLNs {
  return {
    fixPrefix: element.getAttribute("fixPrefix") === "true" ? true : false,
    fixLnInst: element.getAttribute("fixLnInst") === "true" ? true : false,
  };
}

function fileHandling(element: Element): FileHandling {
  return {
    mms: element.getAttribute("mms") === "false" ? false : true,
    ftp: element.getAttribute("ftp") === "true" ? true : false,
    ftps: element.getAttribute("ftps") === "true" ? true : false,
  };
}

function serviceWithMax(element: Element): ServiceWithMax {
  return { max: parseInt(element.getAttribute("max") ?? "0", 10) };
}

function sMVsc(element: Element): SMVsc {
  return {
    ...serviceWithMax(element),
    delivery: element.getAttribute("delivery") ?? "multicast",
    deliveryConf:
      element.getAttribute("deliveryConf") === "true" ? true : false,
    sv: element.getAttribute("sv") === "false" ? false : true,
    rSV: element.getAttribute("rSV") === "true" ? true : false,
  };
}

function gOOSEcapabilities(element: Element): GOOSEcapabilities {
  return {
    ...serviceWithMax(element),
    fixedOffs: element.getAttribute("fixedOffs") === "true" ? true : false,
    goose: element.getAttribute("goose") === "false" ? false : true,
    rGOOSE: element.getAttribute("rGOOSE") === "true" ? true : false,
  };
}

function mcSecurity(element: Element): McSecurity {
  return {
    signature: element.getAttribute("signature") === "true" ? true : false,
    encryption: element.getAttribute("encryption") === "true" ? true : false,
  };
}

function serviceSettings(element: Element): ServiceSettings {
  return {
    cbName: element.getAttribute("cbName") ?? "Fix",
    datSet: element.getAttribute("datSet") ?? "Fix",
  };
}

function rate(element: Element, childTag: string): number[] {
  return Array.from(element.querySelectorAll(`:scope > ${childTag}`))
    .map((child) => parseFloat(child.textContent ?? "0"))
    .sort();
}

function sMVSettings(element: Element): SMVSettings {
  const sMVSettings: SMVSettings = {
    ...serviceSettings(element),
    svID: element.getAttribute("svID") ?? "Fix",
    optFields: element.getAttribute("optFields") ?? "Fix",
    smpRate: element.getAttribute("smpRate") ?? "Fix",
    nofASDU: element.getAttribute("nofASDU") ?? "Fix",
    samplesPerSec:
      element.getAttribute("samplesPerSec") === "true" ? true : false,
    pdcTimeStamp:
      element.getAttribute("pdcTimeStamp") === "true" ? true : false,
    synchSrcId: element.getAttribute("synchSrcId") === "true" ? true : false,
    kdaParticipant:
      element.getAttribute("kdaParticipant") === "true" ? true : false,
    SmpRate: rate(element, "SmpRate"),
    SamplesPerSec: rate(element, "SamplesPerSec"),
    SecPerSamples: rate(element, "SecPerSamples"),
  };

  const mcSecurityElement = element.querySelector(":scope > McSecurity");
  if (mcSecurityElement) sMVSettings.mcSecurity = mcSecurity(mcSecurityElement);

  return sMVSettings;
}

function gSESettings(element: Element): GSESettings {
  const gSESettings: GSESettings = {
    ...serviceSettings(element),
    appID: element.getAttribute("appID") ?? "Fix",
    dataLabel: element.getAttribute("dataLabel") ?? "Fix",
    kdaParticipant:
      element.getAttribute("kdaParticipant") === "true" ? true : false,
  };

  const mcSecurityElement = element.querySelector(":scope > McSecurity");
  if (mcSecurityElement) gSESettings.mcSecurity = mcSecurity(mcSecurityElement);

  return gSESettings;
}

function logSettings(element: Element): LogSettings {
  return {
    ...serviceSettings(element),
    logEna: element.getAttribute("logEna") ?? "Fix",
    trgOps: element.getAttribute("trgOps") ?? "Fix",
    intgPd: element.getAttribute("intgPd") ?? "Fix",
  };
}

function reportSettings(element: Element): ReportSettings {
  return {
    ...serviceSettings(element),
    rptID: element.getAttribute("rptID") ?? "Fix",
    optFields: element.getAttribute("optFields") ?? "Fix",
    bufTime: element.getAttribute("bufTime") ?? "Fix",
    trgOps: element.getAttribute("trgOps") ?? "Fix",
    intgPd: element.getAttribute("intgPd") ?? "Fix",
    resvTms: element.getAttribute("resvTms") === "true" ? true : false,
    owner: element.getAttribute("owner") === "true" ? true : false,
  };
}

function serviceConfReportControl(element: Element): ServiceConfReportControl {
  const max = serviceWithMax(element).max;
  const serviceConfReportControl: ServiceConfReportControl = {
    max,
    bufMode: element.getAttribute("bufMode") ?? "both",
    bufConf: element.getAttribute("bufConf") === "true" ? true : false,
    maxBuf: element.getAttribute("maxBuf")
      ? parseInt(element.getAttribute("maxBuf")!, 10)
      : max,
  };

  return serviceConfReportControl;
}

function serviceWithMaxAndMaxAttributes(
  element: Element,
): ServiceWithMaxAndMaxAttributes {
  const serviceWithMaxAndMaxAttributes: ServiceWithMaxAndMaxAttributes = {
    ...serviceWithMax(element),
  };
  const maxAttributes = element.getAttribute("maxAttributes");
  if (maxAttributes)
    serviceWithMaxAndMaxAttributes.maxAttributes = parseInt(maxAttributes, 10);

  return serviceWithMaxAndMaxAttributes;
}

function serviceForConfDataSet(element: Element): ServiceForConfDataSet {
  return {
    ...serviceWithMaxAndMaxAttributes(element),
    modify: element.getAttribute("modify") === "false" ? false : true,
  };
}

function resvTms(element: Element): ResvTms {
  return {
    resvTms: element.getAttribute("resvTms") === "true" ? true : false,
  };
}

function settingGroups(element: Element): SettingGroups {
  const settingGroups: SettingGroups = {};

  const sGEditElement = element.querySelector(":scope > SGEdit");
  if (sGEditElement) settingGroups.sGEdit = resvTms(sGEditElement);

  const confSGElement = element.querySelector(":scope > ConfSG");
  if (confSGElement) settingGroups.confSG = resvTms(confSGElement);

  return settingGroups;
}

function servicesWithOptionalMax(element: Element): ServiceWithOptionalMax {
  const servicesWithOptionalMax: ServiceWithOptionalMax = {};

  const max = element.getAttribute("max");
  if (max) servicesWithOptionalMax.max = parseInt(max, 10);

  return servicesWithOptionalMax;
}

export function Services(element: Element): ServicesDescription {
  const servicesDescription: ServicesDescription = {
    nameLength: parseInt(element.getAttribute("nameLength") ?? "32", 10),
    getDirectory: element.querySelector(":scope > GetDirectory") ? true : false,
    getDataObjectDefinition: element.querySelector(
      ":scope > GetDataObjectDefinition",
    )
      ? true
      : false,
    dataObjectDirectory: element.querySelector(":scope > DataObjectDirectory")
      ? true
      : false,
    getDataSetValue: element.querySelector(":scope > GetDataSetValue")
      ? true
      : false,
    setDataSetValue: element.querySelector(":scope > SetDataSetValue")
      ? true
      : false,
    dataSetDirectory: element.querySelector(":scope > DataSetDirectory")
      ? true
      : false,
    readWrite: element.querySelector(":scope > ReadWrite") ? true : false,
    timerActivatedControl: element.querySelector(
      ":scope > TimerActivatedControl",
    )
      ? true
      : false,
    getCBValues: element.querySelector(":scope > GetCBValues") ? true : false,
    gSEDir: element.querySelector(":scope > GSEDir") ? true : false,
    confLdName: element.querySelector(":scope > ConfLdName") ? true : false,
  };

  const dynAssociationElement = element.querySelector(
    ":scope > DynAssociation",
  );
  if (dynAssociationElement)
    servicesDescription.dynAssociation = servicesWithOptionalMax(
      dynAssociationElement,
    );

  const settingGroupsElement = element.querySelector(":scope > SettingGroups");
  if (settingGroupsElement)
    servicesDescription.settingGroups = settingGroups(settingGroupsElement);

  const confDataSetElement = element.querySelector(":scope > ConfDataSet");
  if (confDataSetElement)
    servicesDescription.confDataSet = serviceForConfDataSet(confDataSetElement);

  const dynDataSetElement = element.querySelector(":scope > DynDataSet");
  if (dynDataSetElement)
    servicesDescription.dynDataSet =
      serviceWithMaxAndMaxAttributes(dynDataSetElement);

  const confReportControlElement = element.querySelector(
    ":scope > ConfReportControl",
  );
  if (confReportControlElement)
    servicesDescription.confReportControl = serviceConfReportControl(
      confReportControlElement,
    );

  const confLogControlElement = element.querySelector(
    ":scope > ConfLogControl",
  );
  if (confLogControlElement)
    servicesDescription.confLogControl = serviceWithMax(confLogControlElement);

  const reportSettingsElement = element.querySelector(
    ":scope > ReportSettings",
  );
  if (reportSettingsElement)
    servicesDescription.reportSettings = reportSettings(reportSettingsElement);

  const logSettingsElement = element.querySelector(":scope > LogSettings");
  if (logSettingsElement)
    servicesDescription.logSettings = logSettings(logSettingsElement);

  const gSESettingsElement = element.querySelector(":scope > GSESettings");
  if (gSESettingsElement)
    servicesDescription.gSESettings = gSESettings(gSESettingsElement);

  const sMVSettingsElement = element.querySelector(":scope > SMVSettings");
  if (sMVSettingsElement)
    servicesDescription.sMVSettings = sMVSettings(sMVSettingsElement);

  const gOOSEElement = element.querySelector(":scope > GOOSE");
  if (gOOSEElement) servicesDescription.gOOSE = gOOSEcapabilities(gOOSEElement);

  const sMVscElement = element.querySelector(":scope > SMVsc");
  if (sMVscElement) servicesDescription.sMVsc = sMVsc(sMVscElement);

  const fileHandlingElement = element.querySelector(":scope > FileHandling");
  if (fileHandlingElement)
    servicesDescription.fileHandling = fileHandling(fileHandlingElement);

  const confLNsElement = element.querySelector(":scope > ConfLNs");
  if (confLNsElement) servicesDescription.confLNs = confLNs(confLNsElement);

  const clientServicesElement = element.querySelector(
    ":scope > ClientServices",
  );
  if (clientServicesElement)
    servicesDescription.clientServices = clientServices(clientServicesElement);

  const supSubscriptionElement = element.querySelector(
    ":scope > SupSubscription",
  );
  if (supSubscriptionElement)
    servicesDescription.supSubscription = supSubscription(
      supSubscriptionElement,
    );

  const confSigRefElement = element.querySelector(":scope > ConfSigRef");
  if (confSigRefElement)
    servicesDescription.confSigRef = serviceWithMax(confSigRefElement);

  const valueHandlingElement = element.querySelector(":scope > ValueHandling");
  if (valueHandlingElement)
    servicesDescription.valueHandling = valueHandling(valueHandlingElement);

  const redProtElement = element.querySelector(":scope > RedProt");
  if (redProtElement) servicesDescription.redProt = redProt(redProtElement);

  const timeSyncProtElement = element.querySelector(":scope > TimeSyncProt");
  if (timeSyncProtElement)
    servicesDescription.timeSyncProt = timeSyncProt(timeSyncProtElement);

  const commProtElement = element.querySelector(":scope > CommProt");
  if (commProtElement) servicesDescription.commProt = commProt(commProtElement);

  return servicesDescription;
}
