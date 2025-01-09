import { expect } from "chai";
import { describeControlWithTriggerOpt } from "./ControlWithTriggerOpt.js";
const scl = new DOMParser().parseFromString(`<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
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
                    <ReportControl name="reportControl" datSet="baseDataSet" intgPd="0">
                        <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                    </ReportControl>
                    <LogControl name="logControl" datSet="equalDataSet" />
                    <ReportControl name="reportControl1" datSet="diffDataSet" />
                    <LogControl name="logControl1" datSet="invalidDataSet" />
                    <LogControl name="logControl2" datSet="invalidReference" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`, "application/xml");
const baseDataSet = scl.querySelector(`*[datSet="baseDataSet"]`);
const equalDataSet = scl.querySelector('*[datSet="equalDataSet"]');
const diffDataSet = scl.querySelector('*[datSet="diffDataSet"]');
const invalidDataSet = scl.querySelector('*[datSet="invalidDataSet"]');
const invalidReference = scl.querySelector('*[datSet="invalidReference"]');
describe("Description for SCL schema type tControlWithTriggerOpt", () => {
    it("returns undefined when referenced DataSet is undefined", () => expect(describeControlWithTriggerOpt(invalidDataSet)).to.be.undefined);
    it("returns undefined with missing referenced DataSet", () => expect(describeControlWithTriggerOpt(invalidReference)).to.be.undefined);
    it("returns same description with semantically equal Control's", () => expect(JSON.stringify(describeControlWithTriggerOpt(baseDataSet))).to.equal(JSON.stringify(describeControlWithTriggerOpt(equalDataSet))));
    it("returns different description with unequal Control elements", () => expect(JSON.stringify(describeControlWithTriggerOpt(baseDataSet))).to.not.equal(JSON.stringify(describeControlWithTriggerOpt(diffDataSet))));
});
//# sourceMappingURL=ControlWithTriggerOpt.spec.js.map