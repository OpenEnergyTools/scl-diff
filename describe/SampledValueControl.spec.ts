import { expect } from "chai";

import { describeSampledValueControl } from "./SampledValueControl.js";

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
                    <SampledValueControl name="smvControl1" datSet="baseDataSet" confRev="1" smvID="smvID" multicast="true" securityEnable="Signature" smpRate="80" nofASDU="1" smpMod="SmpPerPeriod" >
                      <SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" dataSet="false" security="false" timestamp="false" synchSourceId="false" />
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="CB" lnClass="CSWI" lnInst="1">IED3</IEDName>
                      <IEDName >IED1</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" lnClass="LLN0">IED2</IEDName>
                      <IEDName >IED1</IEDName>
                      <Protocol mustUnderstand="true">R-GOOSE</Protocol>
                    </SampledValueControl>
                    <SampledValueControl name="smvControl2" datSet="equalDataSet" confRev="1" smvID="smvID" securityEnable="Signature" smpRate="80" nofASDU="1" >
                      <SmvOpts />
                      <IEDName >IED1</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="" lnClass="LLN0" lnInst="" >IED2</IEDName>
                      <IEDName apRef="AP1" ldInst="ldInst" prefix="CB" lnClass="CSWI" lnInst="1" >IED3</IEDName>
                      <IEDName >IED1</IEDName>
                      <Protocol mustUnderstand="true">R-GOOSE</Protocol>
                    </SampledValueControl>
                    <SampledValueControl name="smvControl5" datSet="diffDataSet" smpRate="80" nofASDU="1" multicast="false" >
                        <SmvOpts refreshTime="true" sampleSynchronized="false" sampleRate="true" dataSet="true" security="true" timestamp="true" synchSourceId="true" />
                    </SampledValueControl>
                    <SampledValueControl name="smvControl3" datSet="invalidDataSet" />
                    <SampledValueControl name="smvControl4" datSet="invalidReference" />
                    <SampledValueControl name="missingSmpRate" datSet="diffDataSet" nofASDU="1" >
                        <SmvOpts />
                    </SampledValueControl>
                    <SampledValueControl name="missingNofASDU" datSet="diffDataSet" smpRate="80" >
                        <SmvOpts />
                    </SampledValueControl>
                    <SampledValueControl name="missingSmpOpts" datSet="diffDataSet" smpRate="80" nofASDU="1" />
                </LN0>
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
    </SCL>`,
  "application/xml"
);

const baseSampledValueControl = scl.querySelector(`*[datSet="baseDataSet"]`)!;
const equalSampledValueControl = scl.querySelector('*[datSet="equalDataSet"]')!;
const diffSampledValueControl = scl.querySelector('*[datSet="diffDataSet"]')!;
const invalidDataSet = scl.querySelector('*[datSet="invalidDataSet"]')!;
const invalidReference = scl.querySelector('*[datSet="invalidReference"]')!;
const missingSmpRate = scl.querySelector(
  'SampledValueControl[name="missingSmpRate"]'
)!;
const missingNofASDU = scl.querySelector(
  'SampledValueControl[name="missingNofASDU"]'
)!;
const missingSmpOpts = scl.querySelector(
  'SampledValueControl[name="missingSmpOpts"]'
)!;

describe("Description for SCL schema type SampledValueControl", () => {
  it("returns undefined when referenced DataSet is undefined", () =>
    expect(describeSampledValueControl(invalidDataSet)).to.be.undefined);

  it("returns undefined with missing referenced DataSet", () =>
    expect(describeSampledValueControl(invalidReference)).to.be.undefined);

  it("returns undefined with missing smpRate attribute", () =>
    expect(describeSampledValueControl(missingSmpRate)).to.be.undefined);

  it("returns undefined with missing nofASDU attribute", () =>
    expect(describeSampledValueControl(missingNofASDU)).to.be.undefined);

  it("returns undefined with missing SmpOpts child", () =>
    expect(describeSampledValueControl(missingSmpOpts)).to.be.undefined);

  it("returns same description with semantically equal SampledValueControl's", () =>
    expect(
      JSON.stringify(describeSampledValueControl(baseSampledValueControl))
    ).to.equal(
      JSON.stringify(describeSampledValueControl(equalSampledValueControl))
    ));

  it("returns different description with unequal SampledValueControl elements", () => {
    expect(
      JSON.stringify(describeSampledValueControl(baseSampledValueControl))
    ).to.not.equal(
      JSON.stringify(describeSampledValueControl(diffSampledValueControl))
    );
  });
});
