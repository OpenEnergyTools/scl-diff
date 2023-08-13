import { expect } from "chai";

import { describeDataSet } from "./DataSetDescription.js";

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
                    <DataSet name="invalidIedName" >
                        <FCDA ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidLDevice" >
                        <FCDA iedName="IED1" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidLnClass" >
                        <FCDA iedName="IED1" ldInst="lDevice" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidDoName" >
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" daName="stVal" fc="ST" />
                    </DataSet>
                    <DataSet name="invalidFC" >
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" />
                    </DataSet>
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml"
);

const baseDataSet = scl.querySelector(`*[name="baseDataSet"]`)!;
const equalDataSet = scl.querySelector('*[name="equalDataSet"]')!;
const diffDataSet = scl.querySelector('*[name="diffDataSet"]')!;

const invalidIedName = scl.querySelector('*[name="invalidIedName"]')!;
const invalidLDevice = scl.querySelector('*[name="invalidLDevice"]')!;
const invalidLnClass = scl.querySelector('*[name="invalidLnClass"]')!;
const invalidDoName = scl.querySelector('*[name="invalidDoName"]')!;
const invalidFC = scl.querySelector('*[name="invalidFC"]')!;

describe("Description for SCL schema type DataSet", () => {
  it("returns undefined with invalid FCDA child element definition", () => {
    expect(describeDataSet(invalidIedName)).to.be.undefined;
    expect(describeDataSet(invalidLDevice)).to.be.undefined;
    expect(describeDataSet(invalidLnClass)).to.be.undefined;
    expect(describeDataSet(invalidDoName)).to.be.undefined;
    expect(describeDataSet(invalidFC)).to.be.undefined;
  });

  it("returns same description with semantically equal DataSet's", () =>
    expect(JSON.stringify(describeDataSet(baseDataSet))).to.equal(
      JSON.stringify(describeDataSet(equalDataSet))
    ));

  it("returns different description with unequal DataSet elements", () =>
    expect(JSON.stringify(describeDataSet(baseDataSet))).to.not.equal(
      JSON.stringify(describeDataSet(diffDataSet))
    ));
});
