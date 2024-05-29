import { expect } from "chai";

import { Services } from "./Services.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <Services nameLength="43" />
        <AccessPoint name="AP1">
            <Services nameLength="32" >
                <DynAssociation max="5" />
                <SettingGroups >
                    <SGEdit resvTms="false" />
                    <ConfSG revsTms="false" />
                </SettingGroups >
                <ConfDataSet max="0" modify="true" maxAttributes="0" />
                <DynDataSet max="0" maxAttributes="0" />
                <ConfReportControl max="0" bufMode="both" bufConf="false" maxBuf="0" />
                <ConfLogControl max="0" />
                <ReportSettings cbName="Fix" datSet="Fix" rptID="Fix" optFields="Fix" bufTime="Fix" trgOps="Fix" intgPd="Fix" resvTms="false" owner="false"/>
                <LogSettings cbName="Fix" datSet="Fix" logEna="Fix" trgOps="Fix" intgPd="Fix" />
                <GSESettings cbName="Fix" datSet="Fix" appID="Fix" dataLabel="Fix" kdaParticipant="false">
                    <McSecurity signature="false" encryption="false" />
                </GSESettings>
                <SMVSettings cbName="Fix" datSet="Fix" svID="Fix" nofASDU="Fix" optFields="Fix" smpRate="Fix" samplesPerSec="false" pdcTimeStamp="false" synchSrcId="false" kdaParticipant="false">
                    <SmpRate>4000</SmpRate>
                    <SmpRate>4800</SmpRate>
                    <SamplesPerSec>4000</SamplesPerSec>
                    <SamplesPerSec>4800</SamplesPerSec>
                    <SecPerSamples>0.000002</SecPerSamples>
                    <SecPerSamples>0.000001</SecPerSamples>
                    <McSecurity signature="false" encryption="false" />
                </SMVSettings>
                <GOOSE max="0" fixedOffs="false" goose="true" rGOOSE="false" />
                <SMVsc max="0" delivery="multicast" deliveryConf="false" sv="true" rSV="false" />
                <FileHandling mms="true" ftp="false" ftps="false" />
                <ConfLNs fixPrefix="false" fixLnInst="false" />
                <ClientServices goose="false" gsse="false" bufReport="false" unbufReport="false" readLog="false" sv="false" supportsLdName="false" rGOOSE="false" rSV="false" noIctBinding="false">
					<McSecurity signature="false" encryption="false" />
					<TimeSyncProt sntp="true" iec61850_9_3="false" c37_238="false" other="false" />
				</ClientServices>
                <SupSubscription maxGo="0" maxSv="0" />
                <ConfSigRef max="0" />
                <ValueHandling setToRO="false" />
                <RedProt hsr="false" prp="false" rstp="false" />
				<TimeSyncProt sntp="true" iec61850_9_3="false" c37_238="false" other="false" />
                <CommProt ipv6="false" />
                <GetDirectory />
                <GetDataObjectDefinition />
                <DataObjectDirectory />
                <GetDataSetValue />
                <SetDataSetValue />
                <DataSetDirectory />
                <ReadWrite />
                <TimerActivatedControl />
                <GetCBValues />
                <GSEDir />
                <ConfLdName />
            </Services>
        </AccessPoint>
        <AccessPoint name="AP2">
            <Services>
                <DynAssociation max="5" />
                <SettingGroups >
                    <SGEdit />
                    <ConfSG />
                </SettingGroups >
                <ConfDataSet maxAttributes="0" />
                <DynDataSet maxAttributes="0" />
                <ConfReportControl />
                <ConfLogControl />
                <ReportSettings />
                <LogSettings />
                <GSESettings >
                    <McSecurity />
                </GSESettings>
                <SMVSettings >
                    <SmpRate>4800</SmpRate>
                    <SmpRate>4000</SmpRate>
                    <SamplesPerSec>4800</SamplesPerSec>
                    <SamplesPerSec>4000</SamplesPerSec>
                    <SecPerSamples>0.000001</SecPerSamples>
                    <SecPerSamples>0.000002</SecPerSamples>
                    <McSecurity />
                </SMVSettings>
                <GOOSE />
                <SMVsc />
                <FileHandling />
                <ConfLNs />
                <ClientServices>
					<McSecurity />
					<TimeSyncProt />
				</ClientServices>
                <SupSubscription />
                <ValueHandling />
                <RedProt />
			    <TimeSyncProt />
                <CommProt />
                <ConfSigRef />
                <GetDirectory />
                <GetDataObjectDefinition />
                <DataObjectDirectory />
                <GetDataSetValue />
                <SetDataSetValue />
                <DataSetDirectory />
                <ReadWrite />
                <TimerActivatedControl />
                <GetCBValues />
                <GSEDir />
                <ConfLdName />
            </Services>
        </AccessPoint>
        <AccessPoint name="AP3">
            <Services>
                <DynAssociation />
                <ConfDataSet max="5" modify="false" />
                <DynDataSet max="5" />
                <ConfReportControl max="5" bufMode="buffered" bufConf="true" maxBuf="3" />
                <ReportSettings cbName="Conf" datSet="Dyn" rptID="Conf" optFields="Dyn" bufTime="Conf" trgOps="Dyn" intgPd="Conf" resvTms="true" owner="true"/>
                <LogSettings cbName="Conf" datSet="Dyn" logEna="Conf" trgOps="Dyn" intgPd="Conf" />
                <GSESettings cbName="Conf" datSet="Dyn" appID="Conf" dataLabel="Dyn" kdaParticipant="true" >
                    <McSecurity signature="true" encryption="true" />
                </GSESettings>
                <SMVSettings cbName="Conf" datSet="Dyn" svID="Conf" nofASDU="Dyn" optFields="Conf" smpRate="Dyn" samplesPerSec="true" pdcTimeStamp="true" synchSrcId="true" kdaParticipant="true">
                    <McSecurity signature="true" encryption="true" />
                </SMVSettings>
                <GOOSE max="6" fixedOffs="true" goose="false" rGOOSE="true" />
                <SMVsc max="7" delivery="both" deliveryConf="true" sv="false" rSV="true" />
                <FileHandling mms="false" ftp="true" ftps="true" />
                <ConfLNs fixPrefix="true" fixLnInst="true" />
                <ClientServices goose="true" gsse="true" bufReport="true" unbufReport="true" readLog="true" sv="true" supportsLdName="true" rGOOSE="true" rSV="true" noIctBinding="true" maxAttributes="7" maxReports="8" maxGOOSE="9" maxSMV="10" >
					<McSecurity signature="true" encryption="treu" />
					<TimeSyncProt sntp="false" iec61850_9_3="true" c37_238="true" other="true" />
				</ClientServices>
                <SupSubscription maxGo="7" maxSv="8" />
                <ConfSigRef max="9" />
                <ValueHandling setToRO="true" />
                <RedProt hsr="true" prp="true" rstp="true" />
			    <TimeSyncProt sntp="false" iec61850_9_3="true" c37_238="true" other="true" />
                <CommProt ipv6="true" />
            </Services>
        </AccessPoint>
        <AccessPoint name="AP4">
            <Services>
                <SettingGroups >
                    <SGEdit resvTms="true" />
                    <ConfSG resvTms="true" />
                </SettingGroups >
                <ConfDataSet max="5" modify="false" />
                <GSESettings cbName="Conf" datSet="Dyn" appID="Conf" dataLabel="Dyn" kdaParticipant="true" />
                <SMVSettings />
            </Services>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml",
);

const baseServices = scl.querySelector('AccessPoint[name="AP1"]>Services')!;
const equalServices = scl.querySelector('AccessPoint[name="AP2"]>Services')!;
const diffServices = scl.querySelector('AccessPoint[name="AP3"]>Services')!;
const oDiffServices = scl.querySelector('AccessPoint[name="AP4"]>Services')!;
const emptyServices = scl.querySelector("IED>Services")!;

describe("Description for SCL schema type LDevice", () => {
  it("default nameLength attribute to 32", () =>
    expect(Services(emptyServices)?.nameLength).to.equal(43));

  it("return nameLength attribute", () =>
    expect(Services(equalServices)?.nameLength).to.equal(32));

  it("return existing ServicesYesNo as true", () => {
    expect(Services(baseServices).getDirectory).to.be.true;
    expect(Services(baseServices).getDataObjectDefinition).to.be.true;
    expect(Services(baseServices).dataObjectDirectory).to.be.true;
    expect(Services(baseServices).getDataSetValue).to.be.true;
    expect(Services(baseServices).setDataSetValue).to.be.true;
    expect(Services(baseServices).dataSetDirectory).to.be.true;
    expect(Services(baseServices).readWrite).to.be.true;
    expect(Services(baseServices).timerActivatedControl).to.be.true;
    expect(Services(baseServices).getCBValues).to.be.true;
    expect(Services(baseServices).gSEDir).to.be.true;
    expect(Services(baseServices).confLdName).to.be.true;
  });

  it("return missing ServicesYesNo as false", () => {
    expect(Services(diffServices).getDirectory).to.be.false;
    expect(Services(diffServices).getDataObjectDefinition).to.be.false;
    expect(Services(diffServices).dataObjectDirectory).to.be.false;
    expect(Services(diffServices).getDataSetValue).to.be.false;
    expect(Services(diffServices).setDataSetValue).to.be.false;
    expect(Services(diffServices).dataSetDirectory).to.be.false;
    expect(Services(diffServices).readWrite).to.be.false;
    expect(Services(diffServices).timerActivatedControl).to.be.false;
    expect(Services(diffServices).getCBValues).to.be.false;
    expect(Services(diffServices).gSEDir).to.be.false;
    expect(Services(diffServices).confLdName).to.be.false;
  });

  it("return DynAssociation with or without max attribute", () => {
    expect(Services(emptyServices)?.dynAssociation).to.be.undefined;
    expect(Services(diffServices)?.dynAssociation?.max).to.be.undefined;
    expect(Services(baseServices)?.dynAssociation?.max).to.be.equal(5);
  });

  it("return SettingGroups with or without children SGEdit and ConfSG", () => {
    expect(Services(emptyServices)?.settingGroups).to.be.undefined;

    expect(Services(diffServices)?.settingGroups?.sGEdit).to.be.undefined;
    expect(Services(diffServices)?.settingGroups?.confSG).to.be.undefined;

    expect(Services(baseServices)?.settingGroups?.sGEdit?.resvTms).to.be.false;
    expect(Services(baseServices)?.settingGroups?.confSG?.resvTms).to.be.false;

    expect(Services(oDiffServices)?.settingGroups?.confSG?.resvTms).to.be.true;
    expect(Services(oDiffServices)?.settingGroups?.sGEdit?.resvTms).to.be.true;
  });

  it("return optional ConfDataSet ", () => {
    expect(Services(emptyServices)?.confDataSet).to.be.undefined;

    expect(Services(diffServices)?.confDataSet?.modify).to.be.false;
    expect(Services(diffServices)?.confDataSet?.maxAttributes).to.be.undefined;
    expect(Services(diffServices)?.confDataSet?.max).to.equal(5);

    expect(Services(baseServices)?.confDataSet?.max).to.be.equal(0);
    expect(Services(baseServices)?.confDataSet?.modify).to.be.true;
    expect(Services(baseServices)?.confDataSet?.maxAttributes).to.be.equal(0);
  });

  it("return optional DynDataSet ", () => {
    expect(Services(emptyServices)?.dynDataSet).to.be.undefined;

    expect(Services(diffServices)?.dynDataSet?.maxAttributes).to.be.undefined;
    expect(Services(diffServices)?.dynDataSet?.max).to.equal(5);

    expect(Services(baseServices)?.dynDataSet?.max).to.be.equal(0);
    expect(Services(baseServices)?.dynDataSet?.maxAttributes).to.be.equal(0);
  });

  it("return optional ConfReportControl ", () => {
    expect(Services(emptyServices)?.confReportControl).to.be.undefined;

    expect(Services(diffServices)?.confReportControl?.bufConf).to.be.true;
    expect(Services(diffServices)?.confReportControl?.bufMode).to.equal(
      "buffered",
    );
    expect(Services(diffServices)?.confReportControl?.maxBuf).to.equal(3);
    expect(Services(diffServices)?.confReportControl?.max).to.equal(5);

    expect(Services(baseServices)?.confReportControl?.max).to.be.equal(0);
    expect(Services(baseServices)?.confReportControl?.bufMode).to.be.equal(
      "both",
    );
  });

  it("return optional ReportSettings ", () => {
    expect(Services(emptyServices)?.reportSettings).to.be.undefined;

    expect(Services(diffServices)?.reportSettings?.cbName).to.be.equal("Conf");
    expect(Services(diffServices)?.reportSettings?.datSet).to.be.equal("Dyn");
    expect(Services(diffServices)?.reportSettings?.rptID).to.be.equal("Conf");
    expect(Services(diffServices)?.reportSettings?.optFields).to.be.equal(
      "Dyn",
    );
    expect(Services(diffServices)?.reportSettings?.bufTime).to.be.equal("Conf");
    expect(Services(diffServices)?.reportSettings?.trgOps).to.be.equal("Dyn");
    expect(Services(diffServices)?.reportSettings?.intgPd).to.be.equal("Conf");
    expect(Services(diffServices)?.reportSettings?.resvTms).to.be.true;
    expect(Services(diffServices)?.reportSettings?.owner).to.be.true;

    expect(Services(baseServices)?.reportSettings?.cbName).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.datSet).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.rptID).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.optFields).to.be.equal(
      "Fix",
    );
    expect(Services(baseServices)?.reportSettings?.trgOps).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.bufTime).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.intgPd).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.resvTms).to.be.false;
    expect(Services(baseServices)?.reportSettings?.owner).to.be.false;
  });

  it("return optional LogSettings ", () => {
    expect(Services(emptyServices)?.reportSettings).to.be.undefined;

    expect(Services(diffServices)?.logSettings?.cbName).to.be.equal("Conf");
    expect(Services(diffServices)?.logSettings?.datSet).to.be.equal("Dyn");
    expect(Services(diffServices)?.logSettings?.logEna).to.be.equal("Conf");
    expect(Services(diffServices)?.logSettings?.trgOps).to.be.equal("Dyn");
    expect(Services(diffServices)?.logSettings?.intgPd).to.be.equal("Conf");

    expect(Services(baseServices)?.logSettings?.cbName).to.be.equal("Fix");
    expect(Services(baseServices)?.logSettings?.datSet).to.be.equal("Fix");
    expect(Services(baseServices)?.logSettings?.logEna).to.be.equal("Fix");
    expect(Services(baseServices)?.logSettings?.trgOps).to.be.equal("Fix");
    expect(Services(baseServices)?.reportSettings?.intgPd).to.be.equal("Fix");
  });

  it("return optional GSESettings ", () => {
    expect(Services(emptyServices)?.gSESettings).to.be.undefined;

    expect(Services(diffServices)?.gSESettings?.cbName).to.be.equal("Conf");
    expect(Services(diffServices)?.gSESettings?.datSet).to.be.equal("Dyn");
    expect(Services(diffServices)?.gSESettings?.appID).to.be.equal("Conf");
    expect(Services(diffServices)?.gSESettings?.dataLabel).to.be.equal("Dyn");
    expect(Services(diffServices)?.gSESettings?.kdaParticipant).to.be.true;
    expect(Services(diffServices)?.gSESettings?.mcSecurity?.signature).to.be
      .true;
    expect(Services(diffServices)?.gSESettings?.mcSecurity?.encryption).to.be
      .true;

    expect(Services(baseServices)?.gSESettings?.cbName).to.be.equal("Fix");
    expect(Services(baseServices)?.gSESettings?.datSet).to.be.equal("Fix");
    expect(Services(baseServices)?.gSESettings?.appID).to.be.equal("Fix");
    expect(Services(baseServices)?.gSESettings?.dataLabel).to.be.equal("Fix");
    expect(Services(baseServices)?.gSESettings?.kdaParticipant).to.be.false;
    expect(Services(baseServices)?.gSESettings?.mcSecurity?.signature).to.be
      .false;
    expect(Services(baseServices)?.gSESettings?.mcSecurity?.encryption).to.be
      .false;

    expect(Services(oDiffServices)?.gSESettings?.mcSecurity).to.be.undefined;
  });

  it("return optional SMVSettings ", () => {
    expect(Services(emptyServices)?.sMVSettings).to.be.undefined;

    expect(Services(diffServices)?.sMVSettings?.cbName).to.be.equal("Conf");
    expect(Services(diffServices)?.sMVSettings?.datSet).to.be.equal("Dyn");
    expect(Services(diffServices)?.sMVSettings?.svID).to.be.equal("Conf");
    expect(Services(diffServices)?.sMVSettings?.nofASDU).to.be.equal("Dyn");
    expect(Services(diffServices)?.sMVSettings?.optFields).to.be.equal("Conf");
    expect(Services(diffServices)?.sMVSettings?.smpRate).to.be.equal("Dyn");
    expect(Services(diffServices)?.sMVSettings?.samplesPerSec).to.be.true;
    expect(Services(diffServices)?.sMVSettings?.pdcTimeStamp).to.be.true;
    expect(Services(diffServices)?.sMVSettings?.synchSrcId).to.be.true;
    expect(Services(diffServices)?.gSESettings?.kdaParticipant).to.be.true;
    expect(Services(diffServices)?.gSESettings?.mcSecurity?.signature).to.be
      .true;
    expect(Services(diffServices)?.gSESettings?.mcSecurity?.encryption).to.be
      .true;

    expect(Services(baseServices)?.sMVSettings?.cbName).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.datSet).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.svID).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.nofASDU).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.optFields).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.smpRate).to.be.equal("Fix");
    expect(Services(baseServices)?.sMVSettings?.samplesPerSec).to.be.false;
    expect(Services(baseServices)?.sMVSettings?.pdcTimeStamp).to.be.false;
    expect(Services(baseServices)?.sMVSettings?.synchSrcId).to.be.false;
    expect(Services(baseServices)?.gSESettings?.kdaParticipant).to.be.false;
    expect(Services(baseServices)?.gSESettings?.mcSecurity?.signature).to.be
      .false;
    expect(Services(baseServices)?.gSESettings?.mcSecurity?.encryption).to.be
      .false;

    expect(Services(oDiffServices)?.sMVSettings?.mcSecurity).to.be.undefined;
  });

  it("return optional GOOSE ", () => {
    expect(Services(emptyServices)?.gOOSE).to.be.undefined;

    expect(Services(diffServices)?.gOOSE?.max).to.be.equal(6);
    expect(Services(diffServices)?.gOOSE?.fixedOffs).to.be.true;
    expect(Services(diffServices)?.gOOSE?.goose).to.be.false;
    expect(Services(diffServices)?.gOOSE?.rGOOSE).to.be.true;

    expect(Services(baseServices)?.gOOSE?.max).to.be.equal(0);
    expect(Services(baseServices)?.gOOSE?.fixedOffs).to.be.false;
    expect(Services(baseServices)?.gOOSE?.goose).to.be.true;
    expect(Services(baseServices)?.gOOSE?.rGOOSE).to.be.false;
  });

  it("return optional SMVsc ", () => {
    expect(Services(emptyServices)?.sMVsc).to.be.undefined;

    expect(Services(diffServices)?.sMVsc?.max).to.be.equal(7);
    expect(Services(diffServices)?.sMVsc?.delivery).to.equal("both");
    expect(Services(diffServices)?.sMVsc?.deliveryConf).to.be.true;
    expect(Services(diffServices)?.sMVsc?.sv).to.be.false;
    expect(Services(diffServices)?.sMVsc?.rSV).to.be.true;

    expect(Services(baseServices)?.sMVsc?.max).to.be.equal(0);
    expect(Services(baseServices)?.sMVsc?.delivery).to.equal("multicast");
    expect(Services(baseServices)?.sMVsc?.deliveryConf).to.be.false;
    expect(Services(baseServices)?.sMVsc?.sv).to.be.true;
    expect(Services(baseServices)?.sMVsc?.rSV).to.be.false;
  });

  it("return optional FileHandling ", () => {
    expect(Services(emptyServices)?.fileHandling).to.be.undefined;

    expect(Services(diffServices)?.fileHandling?.mms).to.false;
    expect(Services(diffServices)?.fileHandling?.ftp).to.true;
    expect(Services(diffServices)?.fileHandling?.ftps).to.be.true;

    expect(Services(baseServices)?.fileHandling?.mms).to.true;
    expect(Services(baseServices)?.fileHandling?.ftp).to.false;
    expect(Services(baseServices)?.fileHandling?.ftps).to.be.false;
  });

  it("return optional ConfLNs ", () => {
    expect(Services(emptyServices)?.confLNs).to.be.undefined;

    expect(Services(diffServices)?.confLNs?.fixPrefix).to.true;
    expect(Services(diffServices)?.confLNs?.fixLnInst).to.true;

    expect(Services(baseServices)?.confLNs?.fixPrefix).to.false;
    expect(Services(baseServices)?.confLNs?.fixLnInst).to.false;
  });

  it("return optional ClientServices ", () => {
    expect(Services(emptyServices)?.clientServices).to.be.undefined;

    expect(Services(diffServices)?.clientServices?.goose).to.true;
    expect(Services(diffServices)?.clientServices?.gsse).to.true;
    expect(Services(diffServices)?.clientServices?.bufReport).to.true;
    expect(Services(diffServices)?.clientServices?.unbufReport).to.true;
    expect(Services(diffServices)?.clientServices?.readLog).to.true;
    expect(Services(diffServices)?.clientServices?.sv).to.true;
    expect(Services(diffServices)?.clientServices?.supportsLdName).to.true;
    expect(Services(diffServices)?.clientServices?.rGOOSE).to.true;
    expect(Services(diffServices)?.clientServices?.rSV).to.true;
    expect(Services(diffServices)?.clientServices?.noIctBinding).to.true;
    expect(Services(diffServices)?.clientServices?.maxAttributes).to.equal(7);
    expect(Services(diffServices)?.clientServices?.maxReports).to.equal(8);
    expect(Services(diffServices)?.clientServices?.maxGOOSE).to.be.equal(9);
    expect(Services(diffServices)?.clientServices?.maxSMV).to.equal(10);

    expect(Services(baseServices)?.clientServices?.goose).to.false;
    expect(Services(baseServices)?.clientServices?.gsse).to.false;
    expect(Services(baseServices)?.clientServices?.bufReport).to.false;
    expect(Services(baseServices)?.clientServices?.unbufReport).to.false;
    expect(Services(baseServices)?.clientServices?.readLog).to.false;
    expect(Services(baseServices)?.clientServices?.sv).to.false;
    expect(Services(baseServices)?.clientServices?.supportsLdName).to.false;
    expect(Services(baseServices)?.clientServices?.rGOOSE).to.false;
    expect(Services(baseServices)?.clientServices?.rSV).to.false;
    expect(Services(baseServices)?.clientServices?.noIctBinding).to.false;
    expect(Services(baseServices)?.clientServices?.maxAttributes).to.be
      .undefined;
    expect(Services(baseServices)?.clientServices?.maxGOOSE).to.be.undefined;
    expect(Services(baseServices)?.clientServices?.maxSMV).to.be.undefined;
    expect(Services(baseServices)?.clientServices?.maxReports).to.be.undefined;
  });

  it("return optional SupSubscription ", () => {
    expect(Services(emptyServices)?.supSubscription).to.be.undefined;

    expect(Services(diffServices)?.supSubscription?.maxGo).to.equal(7);
    expect(Services(diffServices)?.supSubscription?.maxSv).to.equal(8);

    expect(Services(baseServices)?.supSubscription?.maxGo).to.equal(0);
    expect(Services(baseServices)?.supSubscription?.maxSv).to.equal(0);
  });

  it("return optional ConfSigRef ", () => {
    expect(Services(emptyServices)?.confSigRef).to.be.undefined;
    expect(Services(diffServices)?.confSigRef?.max).to.equal(9);
    expect(Services(baseServices)?.confSigRef?.max).to.equal(0);
  });

  it("return optional ValueHandling ", () => {
    expect(Services(emptyServices)?.valueHandling).to.be.undefined;
    expect(Services(diffServices)?.valueHandling?.setToRO).to.be.true;
    expect(Services(baseServices)?.valueHandling?.setToRO).to.false;
  });

  it("return optional RedProt ", () => {
    expect(Services(emptyServices)?.redProt).to.be.undefined;

    expect(Services(diffServices)?.redProt?.hsr).to.true;
    expect(Services(diffServices)?.redProt?.prp).to.true;
    expect(Services(diffServices)?.redProt?.rstp).to.true;

    expect(Services(baseServices)?.redProt?.hsr).to.false;
    expect(Services(baseServices)?.redProt?.prp).to.false;
    expect(Services(baseServices)?.redProt?.rstp).to.false;
  });

  it("return optional TimeSyncProt ", () => {
    expect(Services(emptyServices)?.timeSyncProt).to.be.undefined;

    expect(Services(diffServices)?.timeSyncProt?.sntp).to.false;
    expect(Services(diffServices)?.timeSyncProt?.iec61850_9_3).to.true;
    expect(Services(diffServices)?.timeSyncProt?.c37_238).to.true;
    expect(Services(diffServices)?.timeSyncProt?.other).to.true;

    expect(Services(baseServices)?.timeSyncProt?.sntp).to.true;
    expect(Services(baseServices)?.timeSyncProt?.iec61850_9_3).to.false;
    expect(Services(baseServices)?.timeSyncProt?.c37_238).to.false;
    expect(Services(baseServices)?.timeSyncProt?.other).to.false;
  });

  it("return optional CommProt ", () => {
    expect(Services(emptyServices)?.commProt).to.be.undefined;
    expect(Services(diffServices)?.commProt?.ipv6).to.be.true;
    expect(Services(baseServices)?.commProt?.ipv6).to.false;
  });

  it("returns same description with semantically equal LDevice's", () =>
    expect(JSON.stringify(Services(baseServices))).to.equal(
      JSON.stringify(Services(equalServices)),
    ));

  it("returns different description with unequal LDevice elements", () =>
    expect(JSON.stringify(Services(baseServices))).to.not.equal(
      JSON.stringify(Services(diffServices)),
    ));
});
