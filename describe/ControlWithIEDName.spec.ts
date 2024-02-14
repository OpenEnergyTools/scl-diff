import { expect } from "chai";

import { describeControlWithIEDName } from "./ControlWithIEDName.js";

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
                    <GSEControl name="gseControl1" datSet="baseDataSet" confRev="1" >
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="CB" lnClass="CSWI" lnInst="1">IED3</IEDName>
                      <IEDName >IED1</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" lnClass="LLN0">IED2</IEDName>
                      <IEDName >IED1</IEDName>
                    </GSEControl>
                    <GSEControl name="gseControl2" datSet="equalDataSet" confRev="1" >
                      <IEDName >IED1</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="" lnClass="LLN0" lnInst="" >IED2</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="CB" lnClass="CSWI" lnInst="1" >IED3</IEDName>
                      <IEDName >IED1</IEDName>
                    </GSEControl>
                    <GSEControl name="gseControl5" datSet="diffDataSet" />
                    <GSEControl name="gseControl3" datSet="invalidDataSet" />
                    <GSEControl name="gseControl4" datSet="invalidReference" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml",
);

const baseGSEControl = scl.querySelector(`*[datSet="baseDataSet"]`)!;
const equalGSEControl = scl.querySelector('*[datSet="equalDataSet"]')!;
const diffGSEControl = scl.querySelector('*[datSet="diffDataSet"]')!;
const invalidDataSet = scl.querySelector('*[datSet="invalidDataSet"]')!;
const invalidReference = scl.querySelector('*[datSet="invalidReference"]')!;

describe("Description for SCL schema type tControlWithIEDName", () => {
  it("returns undefined when referenced DataSet is undefined", () =>
    expect(describeControlWithIEDName(invalidDataSet)).to.be.undefined);

  it("returns undefined with missing referenced DataSet", () =>
    expect(describeControlWithIEDName(invalidReference)).to.be.undefined);

  it("returns same description with semantically equal ControlWithIEDName's", () =>
    expect(JSON.stringify(describeControlWithIEDName(baseGSEControl))).to.equal(
      JSON.stringify(describeControlWithIEDName(equalGSEControl)),
    ));

  it("returns different description with unequal ControlWithIEDName elements", () =>
    expect(
      JSON.stringify(describeControlWithIEDName(baseGSEControl)),
    ).to.not.equal(JSON.stringify(describeControlWithIEDName(diffGSEControl))));
});
