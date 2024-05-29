import { expect } from "chai";
import { describeReportControl } from "./ReportControl";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <AccessPoint name="AP1">
            <Server>
              <LDevice inst="lDevice">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0">
                    <DataSet name="baseDataSet" >
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" fc="ST" />
                    </DataSet>
                    <DataSet name="equalDataSet" >
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" fc="ST" />
                    </DataSet>
                    <DataSet name="diffDataSet" >
                        <Private type="private" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidDataSet" >
                        <FCDA ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidDataSet" >
                        <FCDA ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    </DataSet>
                    <ReportControl name="baseReport" datSet="baseDataSet" intgPd="0" indexed="true" bufTime="0" buffered="true" confRev="0" >
                        <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                        <OptFields seqNum="false" timeStamp="false" dataSet="false" reasonCode="false" dataRef="false" entryID="false" configRef="false" bufOvfl="false"/>
                        <RptEnabled max="0" />
                    </ReportControl>
                    <ReportControl name="diffReport" datSet="diffDataSet" intgPd="1000" buffered="false" indexed="false" bufTime="100" confRev="4">
                        <TrgOps dchg="false" qchg="true" dupd="false" period="true" gi="false" />
                        <OptFields seqNum="false" timeStamp="false" dataSet="true" reasonCode="false" dataRef="true" entryID="false" configRef="false" bufOvfl="false"/>
                        <RptEnabled max="5" >
                            <ClientLN iedName="IED1" apRef="AP1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" />
                            <ClientLN iedName="IED1" apRef="AP1" ldInst="lDevice" lnClass="LLN0" />
                            <ClientLN iedName="IED1" ldInst="lDevice2" lnClass="LLN0" lnInst="" />
                            <ClientLN iedName="IED1" lnClass="LLN0" lnInst="" />
                            <ClientLN iedName="IED1" ldInst="lDevice2" lnInst="" />
                            <ClientLN apRef="AP1" ldInst="lDevice2" lnClass="LLN0" lnInst="" />
                        </RptEnabled>
                    </ReportControl>
                    <ReportControl name="equalReport" datSet="equalDataSet" />
                    <ReportControl name="reportControl1" datSet="diffDataSet" />
                    <ReportControl name="invalidReport" datSet="invalidDataSet" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml",
);

const baseDataSet = scl.querySelector(`ReportControl[name="baseReport"]`)!;
const equalDataSet = scl.querySelector('ReportControl[name="equalReport"]')!;
const diffReport = scl.querySelector('ReportControl[name="diffReport"]')!;
const invalidReport = scl.querySelector('ReportControl[name="invalidReport"]')!;

describe("Description for SCL schema type ReportControl", () => {
  it("returns undefined with invalid data", () =>
    expect(describeReportControl(invalidReport)).to.be.undefined);

  it("excludes invalid ClientLN elements", () =>
    expect(describeReportControl(diffReport)?.clients.length).to.equal(3));

  it("returns same description with semantically equal Control's", () =>
    expect(JSON.stringify(describeReportControl(baseDataSet))).to.equal(
      JSON.stringify(describeReportControl(equalDataSet)),
    ));

  it("returns different description with unequal Control elements", () =>
    expect(JSON.stringify(describeReportControl(baseDataSet))).to.not.equal(
      JSON.stringify(describeReportControl(diffReport)),
    ));
});
