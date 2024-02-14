import { expect } from "chai";
import { LDevice } from "./LDevice.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <AccessPoint name="AP1">
            <Server>
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0">
                    <DataSet name="baseDataSet" >
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" fc="ST" />
                    </DataSet>
                    <DOI name="Beh" >
                        <DAI name="stVal">
                            <Val>on</Val>
                        </DAI>
                    </DOI>
                    <GSEControl name="gse1" datSet="baseDataSet" />
                    <GSEControl name="gse2" />
                    <SampledValueControl name="smv1" datSet="baseDataSet" smpRate="80" nofASDU="1" >
                        <SmvOpts />
                    </SampledValueControl>
                    <SampledValueControl name="smv2" smpRate="80" nofASDU="1" >
                        <SmvOpts />
                    </SampledValueControl>
                    <Log name="someLog" />
                    <Log name="someOtherLog" />
                    <Inputs>
                      <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
                    </Inputs>
                </LN0>
                <LN prefix="Meas" lnClass="MMXU" inst="1" lnType="MMXU" >
                    <DataSet name="baseDataSet" >
                      <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                      <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                      <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" daName="stVal" fc="ST" />
                      <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" fc="ST" />
                    </DataSet>
                    <DOI name="A" >
                        <SDI name="phsA" >
                            <SDI name="cVal" >
                                <SDI name="mag" >
                                    <DAI name="f" >
                                      <Val sGroup="1">10.10</Val>
                                      <Val sGroup="3">30.30</Val>
                                      <Val sGroup="2">20.20</Val>
                                    </DAI>
                                </SDI>
                            </SDI>
                        </SDI>
                    </DOI>
                    <LogControl name="anotherLog" logName="logName" />
                    <LogControl name="log" dataSet="baseDataSet" logName="logName" reasonCode="true" logEna="true" intgPd="0" bufTime="0" >
                      <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                    </LogControl>
                    <ReportControl name="report" datSet="baseDataSet" intgPd="0" indexed="true" buffered="true" bufTime="0" confRev="0" >
                        <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                        <OptFields seqNum="false" timeStamp="false" dataSet="false" reasonCode="false" dataRef="false" entryID="false" configRef="false" bufOvfl="false"/>
                        <RptEnabled max="0" />
                    </ReportControl>
                    <ReportControl name="anotherReport" />
                </LN>
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
              </LDevice>
              <LDevice inst="lDevice2">
                <LN0 lnClass="LLN0" inst="" lnType="LLN02" >
                    <DataSet name="equalDataSet" >
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" fc="ST" />
                    </DataSet>
                    <GSEControl name="gse2" />
                    <GSEControl name="gse1" datSet="equalDataSet" />
                    <SampledValueControl name="smv2" smpRate="80" nofASDU="1" >
                        <SmvOpts />
                    </SampledValueControl>
                    <SampledValueControl name="smv1" datSet="equalDataSet" smpRate="80" nofASDU="1" >
                        <SmvOpts />
                    </SampledValueControl>
                    <Log name="someOtherLog" />
                    <Log name="someLog" />
                    <Inputs>
                        <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
                    </Inputs>
                </LN0>
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
                <LN prefix="Meas" lnClass="MMXU" inst="1" lnType="MMXU2" >
                  <DataSet name="equalDataSet" >
                    <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                    <FCDA iedName="IED1" ldInst="lDevice" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
                    <FCDA iedName="IED1" ldInst="lDevice" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" fc="ST" />
                    <FCDA iedName="IED1" ldInst="lDevice" lnClass="LLN0" doName="Beh" fc="ST" />
                  </DataSet>
                  <LogControl name="log" dataSet="equalDataSet" logName="logName" />
                  <LogControl name="anotherLog" logName="logName" />
                  <ReportControl name="anotherReport" />
                  <ReportControl name="report" datSet="equalDataSet" />
                </LN>
              </LDevice>
              <LDevice inst="lDevice3" ldName="ldName" >
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" >
                  <DOI name="Beh" >
                    <DAI name="stVal">
                      <Val>test</Val>
                    </DAI>
                  </DOI>
                  <Inputs>
                      <ExtRef intAddr="A.phsA" pLN="MMXU" pDO="A.phsA" pDA="cVal.mag.f" pServT="SMV" />
                  </Inputs>
                </LN0>
                <LN prefix="Meas" lnClass="MMXU" inst="1" lnType="MMXU" >
                    <DOI name="A" >
                        <SDI >
                          <Val sGroup="1">10.10</Val>
                          <Val sGroup="3">30.30</Val>
                          <Val sGroup="2">20.20</Val>
                        </SDI>
                    </DOI>
                </LN>
                <AccessControl>Some AccessControl Own Namespace thingy!</AccessControl>
              </LDevice>
              <LDevice inst="lDevice4" >
              </LDevice>
              <LDevice inst="lDevice5" >
                <LN0 lnClass="LLN0" inst="" />
              </LDevice>
              <LDevice inst="lDevice6" >
                <LN0 lnClass="LLN0" inst="LLN0" />
                <LN lnClass="PTOC" inst="1" lnType="invalidPTOC" />
              </LDevice>
              <LDevice inst="lDevice7" >
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
                <LN lnType="MMXU" />
              </LDevice>
              <LDevice inst="lDevice8" >
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU3" />
                <LN lnType="MMXU" />
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
      <DataTypeTemplates>
        <LNodeType id="invalidPTOC" desc="desc" lnType="lnType" />
        <LNodeType id="LLN0" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="BehENS"/>
        </LNodeType>
        <LNodeType id="LLN02" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="BehENS2"/>
        </LNodeType>
        <LNodeType id="diffLLN0" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="diffBehENS"/>
        </LNodeType>
        <LNodeType id="MMXU" desc="desc" lnClass="MMXU">     
          <DO name="A" type="WYE"/>
        </LNodeType>
        <LNodeType id="MMXU2" desc="desc" lnClass="MMXU">     
          <DO name="A" type="WYE2"/>
        </LNodeType>
        <LNodeType id="diffMMXU" desc="desc" lnClass="MMXU">     
          <DO name="A" type="diffWYE"/>
        </LNodeType>
        <DOType cdc="ENS" id="BehENS" >
          <DA name="stVal" bType="Enum" type="BehModKind" fc="ST" >
            <Val>off</Val>
          </DA>
        </DOType>
        <DOType cdc="ENS" id="BehENS2" >
          <DA name="stVal" bType="Enum" type="BehModKind" fc="ST" >
            <Val>on</Val>
          </DA>
        </DOType>
        <DOType id="diffBehENS" cdc="ENS" >
          <DA name="stVal" bType="Enum" type="BehModKind" fc="ST" >
            <Val>on</Val>
          </DA>
          <DA name="q" bType="Quality" fc="ST" />
        </DOType>
        <DOType id="WYE" cdc="WYE">
          <SDO name="phsA" type="CMV" />
        </DOType>
        <DOType id="WYE2" cdc="WYE">
          <SDO name="phsA" type="CMV2" />
        </DOType>
        <DOType id="diffWYE" cdc="WYE">
          <SDO name="phsA" type="diffCMV" />
          <SDO name="phsB" type="CMV" />
        </DOType>
        <DOType id="CMV" cdc="CMV" >
          <DA name="cVal" bType="Struct" fc="MX" type="Vector"/>
        </DOType>
        <DOType id="CMV2" cdc="CMV" >
          <DA name="cVal" bType="Struct" fc="MX" type="Vector2"/>
        </DOType>
        <DOType id="diffCMV" cdc="CMV" >
          <DA name="cVal" bType="Struct" fc="MX" type="diffVector"/>
          <DA name="q" bType="Quality" fc="MX" />
        </DOType>
        <DAType id="Vector" >
          <BDA name="mag" bType="Struct" type="AnalogueValue" />
        </DAType>
        <DAType id="Vector2" >
          <BDA name="mag" bType="Struct" type="AnalogueValue2" />
        </DAType>
        <DAType id="diffVector" >
          <BDA name="mag" bType="Struct" type="AnalogueValue" />
          <BDA name="ang" bType="Struct" type="AnalogueValue" />
        </DAType>
        <DAType id="AnalogueValue" >
          <BDA name="f" bType="FLOAT32" >
              <Val sGroup="3">60.60</Val>
              <Val sGroup="1">10.10</Val>
              <Val sGroup="2">40.10</Val>
          </BDA>
        </DAType>
        <DAType id="AnalogueValue2" >
          <BDA name="f" bType="FLOAT32" >
              <Val sGroup="3">30.30</Val>
              <Val sGroup="1">10.10</Val>
              <Val sGroup="2">20.20</Val>
          </BDA>
        </DAType>
        <EnumType id="BehModKind" >
          <EnumVal ord="1">on</EnumVal>
          <EnumVal ord="3">test</EnumVal>
          <EnumVal ord="5">off</EnumVal>
        </EnumType>
        <EnumType id="diffBehModKind" >
          <EnumVal ord="1">on</EnumVal>
          <EnumVal ord="3">test</EnumVal>
        </EnumType>
      </DataTypeTemplates>
    </SCL>`,
  "application/xml",
);

/*
const missingLnType = scl.querySelector('*[desc="missingLnType"]')!;
const invalidLnType = scl.querySelector('*[desc="invalidLnType"]')!;
const invalidLnTypeDescription = scl.querySelector(
  '*[desc="invalidLnTypeDescription"]'
)!; */

const baseLDevice = scl.querySelector(`LDevice[inst="lDevice1"]`)!;
const equalLDevice = scl.querySelector('LDevice[inst="lDevice2"]')!;
const diffLDevice = scl.querySelector('LDevice[inst="lDevice3"]')!;
const missingLLN0 = scl.querySelector('LDevice[inst="lDevice4"]')!;
const missingLnType = scl.querySelector('LDevice[inst="lDevice5"]')!;
const invalidLnType = scl.querySelector('LDevice[inst="lDevice6"]')!;
const missingInst = scl.querySelector('LDevice[inst="lDevice7"]')!;
const undefinedLN = scl.querySelector('LDevice[inst="lDevice8"]')!;

describe("Description for SCL schema type LDevice", () => {
  it("returns undefined with missing lnType attribute", () =>
    expect(LDevice(missingLLN0)).to.be.undefined);

  it("returns undefined with missing lnType attribute", () =>
    expect(LDevice(missingLnType)).to.be.undefined);

  it("returns undefined with invalid lnType attribute", () =>
    expect(LDevice(invalidLnType)).to.be.undefined);

  it("returns undefined with missing lnType attribute", () =>
    expect(LDevice(missingInst)).to.be.undefined);

  it("returns undefined with at least one undefined LNDescription", () =>
    expect(LDevice(undefinedLN)).to.be.undefined);

  it("return ldName attribute if present", () =>
    expect(LDevice(diffLDevice)?.ldName).to.equal("ldName"));

  it("return AccessControl child as a string if present", () =>
    expect(LDevice(diffLDevice)?.accessControl).to.equal(
      `<AccessControl xmlns="http://www.iec.ch/61850/2003/SCL">Some AccessControl Own Namespace thingy!</AccessControl>`,
    ));

  it("returns same description with semantically equal LDevice's", () =>
    expect(JSON.stringify(LDevice(baseLDevice))).to.equal(
      JSON.stringify(LDevice(equalLDevice)),
    ));

  it("returns different description with unequal LDevice elements", () =>
    expect(JSON.stringify(LDevice(baseLDevice))).to.not.equal(
      JSON.stringify(LDevice(diffLDevice)),
    ));
});
