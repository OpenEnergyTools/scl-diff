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
export declare function Services(element: Element): ServicesDescription;
export {};
