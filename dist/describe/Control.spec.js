import { expect } from "chai";
import { describeControl } from "./Control.js";
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
                    <GSEControl name="gseControl" datSet="baseDataSet" />
                    <SampledValueControl name="smvControl" datSet="equalDataSet" />
                    <ReportControl name="reportControl" datSet="diffDataSet" />
                    <ReportControl name="reportControl1" />
                    <ReportControl name="reportControl2" datSet="invalidDataSet" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`, "application/xml");
const baseDataSet = scl.querySelector(`*[datSet="baseDataSet"]`);
const equalDataSet = scl.querySelector('*[datSet="equalDataSet"]');
const diffDataSet = scl.querySelector('*[datSet="diffDataSet"]');
const missingDatSet = scl.querySelector("*:not([datSet])");
const invalidDataSet = scl.querySelector('*[datSet="invalidDataSet"]');
const parentLessControl = new DOMParser()
    .parseFromString(`<ReportControl name="reportControl" datSet="parentLessDataSet" >`, "application/xml")
    .querySelector("ReportControl");
describe("Description for SCL schema type tControl", () => {
    it("returns dataSet free object with missing datSet element", () => expect(describeControl(missingDatSet)).to.not.have.property("dataSet"));
    it("returns undefined with missing DataSet", () => expect(describeControl(parentLessControl)).to.be.undefined);
    it("returns undefined when referenced DataSet is undefined", () => expect(describeControl(invalidDataSet)).to.be.undefined);
    it("returns same description with semantically equal Control's", () => expect(JSON.stringify(describeControl(baseDataSet))).to.equal(JSON.stringify(describeControl(equalDataSet))));
    it("returns different description with unequal Control elements", () => expect(JSON.stringify(describeControl(baseDataSet))).to.not.equal(JSON.stringify(describeControl(diffDataSet))));
});
//# sourceMappingURL=Control.spec.js.map