import { expect } from "chai";
import { describeLogControl } from "./LogControl.js";

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
                    <LogControl name="baseLogControl" datSet="baseDataSet" ldInst="lDevice" prefix="" lnClass="LLN0" logName="logName" logEna="true" bufTime="0" >
                        <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                    </LogControl>
                    <LogControl name="diffLogControl" datSet="diffDataSet" intgPd="1000" reasonCode="false" logEna="false" logName="logName" >
                        <TrgOps dchg="false" qchg="true" dupd="false" period="true" gi="false" />
                    </LogControl>
                    <LogControl name="equalLogControl" datSet="equalDataSet" ldInst="lDevice" logName="logName" reasonCode="true"  />
                    <LogControl name="missingLogName" datSet="diffDataSet" />
                    <LogControl name="invalidLogControl" datSet="invalidDataSet" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml",
);

const baseLogControl = scl.querySelector(`LogControl[name="baseLogControl"]`)!;
const equalLogControl = scl.querySelector(
  'LogControl[name="equalLogControl"]',
)!;
const diffLogControl = scl.querySelector('LogControl[name="diffLogControl"]')!;
const invalidLogControl = scl.querySelector(
  'LogControl[name="invalidLogControl"]',
)!;
const missingLogName = scl.querySelector('LogControl[name="missingLogName"]')!;

describe("Description for SCL schema type LogControl", () => {
  it("returns undefined with invalid data", () =>
    expect(describeLogControl(invalidLogControl)).to.be.undefined);

  it("returns undefined with invalid logName attribute", () =>
    expect(describeLogControl(missingLogName)).to.be.undefined);

  it("returns same description with semantically equal Control's", () =>
    expect(JSON.stringify(describeLogControl(baseLogControl))).to.equal(
      JSON.stringify(describeLogControl(equalLogControl)),
    ));

  it("returns different description with unequal Control elements", () =>
    expect(JSON.stringify(describeLogControl(baseLogControl))).to.not.equal(
      JSON.stringify(describeLogControl(diffLogControl)),
    ));
});
