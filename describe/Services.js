function commProt(element) {
    return {
        ipv6: element.getAttribute("ipv6") === "true" ? true : false,
    };
}
function redProt(element) {
    return {
        hsr: element.getAttribute("hsr") === "true" ? true : false,
        prp: element.getAttribute("prp") === "true" ? true : false,
        rstp: element.getAttribute("rstp") === "true" ? true : false,
    };
}
function valueHandling(element) {
    return {
        setToRO: element.getAttribute("setToRO") === "true" ? true : false,
    };
}
function supSubscription(element) {
    return {
        maxGo: parseInt(element.getAttribute("maxGo") ?? "0", 10),
        maxSv: parseInt(element.getAttribute("maxSv") ?? "0", 10),
    };
}
function timeSyncProt(element) {
    return {
        sntp: element.getAttribute("sntp") === "false" ? false : true,
        iec61850_9_3: element.getAttribute("iec61850_9_3") === "true" ? true : false,
        c37_238: element.getAttribute("c37_238") === "true" ? true : false,
        other: element.getAttribute("other") === "true" ? true : false,
    };
}
function clientServices(element) {
    const clientServices = {
        goose: element.getAttribute("goose") === "true" ? true : false,
        gsse: element.getAttribute("gsse") === "true" ? true : false,
        bufReport: element.getAttribute("bufReport") === "true" ? true : false,
        unbufReport: element.getAttribute("unbufReport") === "true" ? true : false,
        readLog: element.getAttribute("readLog") === "true" ? true : false,
        sv: element.getAttribute("sv") === "true" ? true : false,
        supportsLdName: element.getAttribute("supportsLdName") === "true" ? true : false,
        rGOOSE: element.getAttribute("rGOOSE") === "true" ? true : false,
        rSV: element.getAttribute("rSV") === "true" ? true : false,
        noIctBinding: element.getAttribute("noIctBinding") === "true" ? true : false,
    };
    const maxAttributes = element.getAttribute("maxAttributes");
    if (maxAttributes)
        clientServices.maxAttributes = parseInt(maxAttributes, 10);
    const maxReports = element.getAttribute("maxReports");
    if (maxReports)
        clientServices.maxReports = parseInt(maxReports, 10);
    const maxGOOSE = element.getAttribute("maxGOOSE");
    if (maxGOOSE)
        clientServices.maxGOOSE = parseInt(maxGOOSE, 10);
    const maxSMV = element.getAttribute("maxSMV");
    if (maxSMV)
        clientServices.maxSMV = parseInt(maxSMV, 10);
    const mcSecurityElement = element.querySelector(":scope > McSecurity");
    if (mcSecurityElement)
        clientServices.mcSecurity = mcSecurity(mcSecurityElement);
    const timeSyncProtElement = element.querySelector(":scope > TimeSyncProt");
    if (timeSyncProtElement)
        clientServices.timeSyncProt = timeSyncProt(timeSyncProtElement);
    return clientServices;
}
function confLNs(element) {
    return {
        fixPrefix: element.getAttribute("fixPrefix") === "true" ? true : false,
        fixLnInst: element.getAttribute("fixLnInst") === "true" ? true : false,
    };
}
function fileHandling(element) {
    return {
        mms: element.getAttribute("mms") === "false" ? false : true,
        ftp: element.getAttribute("ftp") === "true" ? true : false,
        ftps: element.getAttribute("ftps") === "true" ? true : false,
    };
}
function serviceWithMax(element) {
    return { max: parseInt(element.getAttribute("max") ?? "0", 10) };
}
function sMVsc(element) {
    return {
        ...serviceWithMax(element),
        delivery: element.getAttribute("delivery") || "multicast",
        deliveryConf: element.getAttribute("deliveryConf") === "true" ? true : false,
        sv: element.getAttribute("sv") === "false" ? false : true,
        rSV: element.getAttribute("rSV") === "true" ? true : false,
    };
}
function gOOSEcapabilities(element) {
    return {
        ...serviceWithMax(element),
        fixedOffs: element.getAttribute("fixedOffs") === "true" ? true : false,
        goose: element.getAttribute("goose") === "false" ? false : true,
        rGOOSE: element.getAttribute("rGOOSE") === "true" ? true : false,
    };
}
function mcSecurity(element) {
    return {
        signature: element.getAttribute("signature") === "true" ? true : false,
        encryption: element.getAttribute("encryption") === "true" ? true : false,
    };
}
function serviceSettings(element) {
    return {
        cbName: element.getAttribute("cbName") || "Fix",
        datSet: element.getAttribute("datSet") || "Fix",
    };
}
function rate(element, childTag) {
    return Array.from(element.querySelectorAll(`:scope > ${childTag}`))
        .map((child) => parseFloat(child.textContent ?? "0"))
        .sort();
}
function sMVSettings(element) {
    const sMVSettings = {
        ...serviceSettings(element),
        svID: element.getAttribute("svID") || "Fix",
        optFields: element.getAttribute("optFields") || "Fix",
        smpRate: element.getAttribute("smpRate") || "Fix",
        nofASDU: element.getAttribute("nofASDU") || "Fix",
        samplesPerSec: element.getAttribute("samplesPerSec") === "true" ? true : false,
        pdcTimeStamp: element.getAttribute("pdcTimeStamp") === "true" ? true : false,
        synchSrcId: element.getAttribute("synchSrcId") === "true" ? true : false,
        kdaParticipant: element.getAttribute("kdaParticipant") === "true" ? true : false,
        SmpRate: rate(element, "SmpRate"),
        SamplesPerSec: rate(element, "SamplesPerSec"),
        SecPerSamples: rate(element, "SecPerSamples"),
    };
    const mcSecurityElement = element.querySelector(":scope > McSecurity");
    if (mcSecurityElement)
        sMVSettings.mcSecurity = mcSecurity(mcSecurityElement);
    return sMVSettings;
}
function gSESettings(element) {
    const gSESettings = {
        ...serviceSettings(element),
        appID: element.getAttribute("appID") || "Fix",
        dataLabel: element.getAttribute("dataLabel") || "Fix",
        kdaParticipant: element.getAttribute("kdaParticipant") === "true" ? true : false,
    };
    const mcSecurityElement = element.querySelector(":scope > McSecurity");
    if (mcSecurityElement)
        gSESettings.mcSecurity = mcSecurity(mcSecurityElement);
    return gSESettings;
}
function logSettings(element) {
    return {
        ...serviceSettings(element),
        logEna: element.getAttribute("logEna") || "Fix",
        trgOps: element.getAttribute("trgOps") || "Fix",
        intgPd: element.getAttribute("intgPd") || "Fix",
    };
}
function reportSettings(element) {
    return {
        ...serviceSettings(element),
        rptID: element.getAttribute("rptID") || "Fix",
        optFields: element.getAttribute("optFields") || "Fix",
        bufTime: element.getAttribute("bufTime") || "Fix",
        trgOps: element.getAttribute("trgOps") || "Fix",
        intgPd: element.getAttribute("intgPd") || "Fix",
        resvTms: element.getAttribute("resvTms") === "true" ? true : false,
        owner: element.getAttribute("owner") === "true" ? true : false,
    };
}
function serviceConfReportControl(element) {
    const max = serviceWithMax(element).max;
    const serviceConfReportControl = {
        max,
        bufMode: element.getAttribute("bufMode") || "both",
        bufConf: element.getAttribute("bufConf") === "true" ? true : false,
        maxBuf: element.getAttribute("maxBuf")
            ? parseInt(element.getAttribute("maxBuf"), 10)
            : max,
    };
    return serviceConfReportControl;
}
function serviceWithMaxAndMaxAttributes(element) {
    const serviceWithMaxAndMaxAttributes = {
        ...serviceWithMax(element),
    };
    const maxAttributes = element.getAttribute("maxAttributes");
    if (maxAttributes)
        serviceWithMaxAndMaxAttributes.maxAttributes = parseInt(maxAttributes, 10);
    return serviceWithMaxAndMaxAttributes;
}
function serviceForConfDataSet(element) {
    return {
        ...serviceWithMaxAndMaxAttributes(element),
        modify: element.getAttribute("modify") === "false" ? false : true,
    };
}
function resvTms(element) {
    return {
        resvTms: element.getAttribute("resvTms") === "true" ? true : false,
    };
}
function settingGroups(element) {
    const settingGroups = {};
    const sGEditElement = element.querySelector(":scope > SGEdit");
    if (sGEditElement)
        settingGroups.sGEdit = resvTms(sGEditElement);
    const confSGElement = element.querySelector(":scope > ConfSG");
    if (confSGElement)
        settingGroups.confSG = resvTms(confSGElement);
    return settingGroups;
}
function servicesWithOptionalMax(element) {
    const servicesWithOptionalMax = {};
    const max = element.getAttribute("max");
    if (max)
        servicesWithOptionalMax.max = parseInt(max, 10);
    return servicesWithOptionalMax;
}
export function Services(element) {
    const servicesDescription = {
        nameLength: parseInt(element.getAttribute("nameLength") ?? "32", 10),
        getDirectory: element.querySelector(":scope > GetDirectory") ? true : false,
        getDataObjectDefinition: element.querySelector(":scope > GetDataObjectDefinition")
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
        timerActivatedControl: element.querySelector(":scope > TimerActivatedControl")
            ? true
            : false,
        getCBValues: element.querySelector(":scope > GetCBValues") ? true : false,
        gSEDir: element.querySelector(":scope > GSEDir") ? true : false,
        confLdName: element.querySelector(":scope > ConfLdName") ? true : false,
    };
    const dynAssociationElement = element.querySelector(":scope > DynAssociation");
    if (dynAssociationElement)
        servicesDescription.dynAssociation = servicesWithOptionalMax(dynAssociationElement);
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
    const confReportControlElement = element.querySelector(":scope > ConfReportControl");
    if (confReportControlElement)
        servicesDescription.confReportControl = serviceConfReportControl(confReportControlElement);
    const confLogControlElement = element.querySelector(":scope > ConfLogControl");
    if (confLogControlElement)
        servicesDescription.confLogControl = serviceWithMax(confLogControlElement);
    const reportSettingsElement = element.querySelector(":scope > ReportSettings");
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
    if (gOOSEElement)
        servicesDescription.gOOSE = gOOSEcapabilities(gOOSEElement);
    const sMVscElement = element.querySelector(":scope > SMVsc");
    if (sMVscElement)
        servicesDescription.sMVsc = sMVsc(sMVscElement);
    const fileHandlingElement = element.querySelector(":scope > FileHandling");
    if (fileHandlingElement)
        servicesDescription.fileHandling = fileHandling(fileHandlingElement);
    const confLNsElement = element.querySelector(":scope > ConfLNs");
    if (confLNsElement)
        servicesDescription.confLNs = confLNs(confLNsElement);
    const clientServicesElement = element.querySelector(":scope > ClientServices");
    if (clientServicesElement)
        servicesDescription.clientServices = clientServices(clientServicesElement);
    const supSubscriptionElement = element.querySelector(":scope > SupSubscription");
    if (supSubscriptionElement)
        servicesDescription.supSubscription = supSubscription(supSubscriptionElement);
    const confSigRefElement = element.querySelector(":scope > ConfSigRef");
    if (confSigRefElement)
        servicesDescription.confSigRef = serviceWithMax(confSigRefElement);
    const valueHandlingElement = element.querySelector(":scope > ValueHandling");
    if (valueHandlingElement)
        servicesDescription.valueHandling = valueHandling(valueHandlingElement);
    const redProtElement = element.querySelector(":scope > RedProt");
    if (redProtElement)
        servicesDescription.redProt = redProt(redProtElement);
    const timeSyncProtElement = element.querySelector(":scope > TimeSyncProt");
    if (timeSyncProtElement)
        servicesDescription.timeSyncProt = timeSyncProt(timeSyncProtElement);
    const commProtElement = element.querySelector(":scope > CommProt");
    if (commProtElement)
        servicesDescription.commProt = commProt(commProtElement);
    return servicesDescription;
}
//# sourceMappingURL=Services.js.map