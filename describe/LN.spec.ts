import { expect } from "chai";
import { LN } from "./LN.js";
import { LNodeType, isLNodeTypeDescription } from "./LNodeType.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <AccessPoint name="AP1">
            <Server>
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0">
                    <DOI name="Beh" >
                        <DAI name="stVal">
                            <Val>on</Val>
                        </DAI>
                    </DOI>
                </LN0>
                <LN prefix="Meas" lnClass="MMXU" inst="1" lnType="MMXU" >
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
                </LN>
                <LN desc="missingLnType" prefix="" lnClass="PTOC" inst="1" />
                <LN desc="invalidLnType" prefix="" lnClass="PTOC" inst="1" lnType="invalidPointer"/>
                <LN desc="invalidLnTypeDescription" prefix="" lnClass="PTOC" inst="1" lnType="invalidPTOC"/>
              </LDevice>
              <LDevice inst="lDevice2">
                <LN0 lnClass="LLN0" inst="" lnType="LLN02" />
                <LN prefix="Meas" lnClass="MMXU" inst="1" lnType="MMXU2" />
              </LDevice>
              <LDevice inst="lDevice3">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" >
                  <DOI name="Beh" >
                    <DAI name="stVal">
                      <Val>test</Val>
                    </DAI>
                  </DOI>
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
              </LDevice>
              <LDevice inst="lDevice4" >
                <LN0 lnClass="LLN0" inst="" lnType="diffLLN0" />
                <LN lnClass="MMXU" inst="1" lnType="diffMMXU" >
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
                </LN>
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
  "application/xml"
);

const missingLnType = scl.querySelector('*[desc="missingLnType"]')!;
const invalidLnType = scl.querySelector('*[desc="invalidLnType"]')!;
const invalidLnTypeDescription = scl.querySelector(
  '*[desc="invalidLnTypeDescription"]'
)!;

const baseLLN0 = scl.querySelector(
  `LDevice[inst="lDevice1"] > *[lnClass="LLN0"][inst=""]`
)!;
const equalLLN0 = scl.querySelector(
  'LDevice[inst="lDevice2"] > *[lnClass="LLN0"][inst=""]'
)!;
const diffLLN0 = scl.querySelector(
  'LDevice[inst="lDevice3"] > *[lnClass="LLN0"][inst=""]'
)!;
const diffEnumType = scl.querySelector(
  'LDevice[inst="lDevice4"] > *[lnClass="LLN0"][inst=""]'
)!;
const baseMMXU = scl.querySelector(
  `LDevice[inst="lDevice1"] > *[lnClass="MMXU"][inst="1"]`
)!;
const equalMMXU = scl.querySelector(
  `LDevice[inst="lDevice2"] > *[lnClass="MMXU"][inst="1"]`
)!;
const diffMMXU = scl.querySelector(
  `LDevice[inst="lDevice3"] > *[lnClass="MMXU"][inst="1"]`
)!;
const diffSDO = scl.querySelector(
  `LDevice[inst="lDevice4"] > *[lnClass="MMXU"][inst="1"]`
)!;

describe("Description for SCL schema type LN", () => {
  it("returns undefined with missing lnType attribute", () =>
    expect(LN(missingLnType)).to.be.undefined);

  it("returns undefined with invalid lnType attribute", () =>
    expect(LN(invalidLnType)).to.be.undefined);

  it("returns undefined with invalid LNodeType description", () =>
    expect(LN(invalidLnTypeDescription)).to.be.undefined);

  it("return logical node structure in lnType key", () =>
    expect(LN(baseLLN0)?.lnType).to.satisfy(isLNodeTypeDescription));

  it("returns same description with semantically equal LN's", () => {
    expect(JSON.stringify(LN(baseLLN0))).to.equal(
      JSON.stringify(LN(equalLLN0))
    );
    expect(JSON.stringify(LN(baseMMXU))).to.equal(
      JSON.stringify(LN(equalMMXU))
    );
  });

  it("returns different description with unequal LN elements", () => {
    expect(JSON.stringify(LN(baseLLN0))).to.not.equal(
      JSON.stringify(LN(diffLLN0))
    );
    expect(JSON.stringify(LN(baseLLN0))).to.not.equal(
      JSON.stringify(LN(diffEnumType))
    );
    expect(JSON.stringify(LN(baseMMXU))).to.not.equal(
      JSON.stringify(LN(diffMMXU))
    );
    expect(JSON.stringify(LN(baseMMXU))).to.not.equal(
      JSON.stringify(LN(diffSDO))
    );
  });
});
