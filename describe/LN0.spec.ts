import { expect } from "chai";
import { LN } from "./LN.js";
import { LNodeType, isLNodeTypeDescription } from "./LNodeType.js";
import { LN0 } from "./LN0.js";

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
                    <LogControl name="anotherLog" logName="logName" />
                    <LogControl name="log" dataSet="baseDataSet" logName="logName" reasonCode="true" logEna="true" intgPd="0" bufTime="0" >
                      <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                    </LogControl>
                    <ReportControl name="report" datSet="baseDataSet" intgPd="0" indexed="true" buffered="true" bufTime="0" confRev="0" >
                        <TrgOps dchg="false" qchg="false" dupd="false" period="false" gi="false" />
                        <OptFields seqNum="false" timeStamp="false" dataSet="false" reasonCode="false" dataRef="false" entryID="false" configRef="false" bufOvfl="false" />
                        <RptEnabled max="0" />
                    </ReportControl>
                    <ReportControl name="anotherReport" />
                    <Log name="someLog" />
                    <Log name="someOtherLog" />
                    <Inputs>
                      <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
                    </Inputs>
                    <SettingControl numOfSGs="4" />
                </LN0>
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
                    <LogControl name="log" dataSet="equalDataSet" logName="logName" />
                    <LogControl name="anotherLog" logName="logName" />
                    <ReportControl name="anotherReport" />
                    <ReportControl name="report" datSet="equalDataSet" />
                    <Log name="someOtherLog" />
                    <Log name="someLog" />
                    <Inputs>
                        <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
                    </Inputs>
                    <SettingControl numOfSGs="4" />
                </LN0>
              </LDevice>
              <LDevice inst="lDevice3">
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
              </LDevice>
              <LDevice inst="lDevice4" >
                <LN0 lnClass="LLN0" inst="" lnType="diffLLN0" />
              </LDevice>
              <LDevice inst="lDevice5" >
                <LN0 lnClass="LLN0" />
              </LDevice>
              <LDevice inst="lDevice6" >
                <LN0 lnClass="LLN0" lnType="invalidReference" />
              </LDevice>
              <LDevice inst="lDevice7" >
                <LN0 lnClass="LLN0" lnType="invalidLLN0" />
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
      <DataTypeTemplates>
        <LNodeType id="invalidLLN0" desc="desc" lnType="lnType" />
        <LNodeType id="LLN0" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="BehENS"/>
        </LNodeType>
        <LNodeType id="LLN02" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="BehENS2"/>
        </LNodeType>
        <LNodeType id="diffLLN0" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="diffBehENS"/>
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

const missingLnType = scl.querySelector('LDevice[inst="lDevice5"] > LN0')!;
const invalidLnType = scl.querySelector('LDevice[inst="lDevice6"] > LN0')!;
const invalidLnTypeDescription = scl.querySelector(
  'LDevice[inst="lDevice7"] > LN0',
)!;

const baseLLN0 = scl.querySelector(`LDevice[inst="lDevice1"] > LN0`)!;
const equalLLN0 = scl.querySelector('LDevice[inst="lDevice2"] > LN0')!;
const diffLLN0 = scl.querySelector('LDevice[inst="lDevice3"] > LN0')!;
const diffEnumType = scl.querySelector('LDevice[inst="lDevice4"] > LN0')!;

describe("Description for SCL schema type LN0", () => {
  it("returns undefined with missing lnType attribute", () =>
    expect(LN0(missingLnType)).to.be.undefined);

  it("returns undefined with invalid lnType attribute", () =>
    expect(LN0(invalidLnType)).to.be.undefined);

  it("returns undefined with invalid LNodeType description", () =>
    expect(LN0(invalidLnTypeDescription)).to.be.undefined);

  it("return logical node structure in lnType key", () =>
    expect(LN0(baseLLN0)?.lnType).to.satisfy(isLNodeTypeDescription));

  it("returns same description with semantically equal LN0's", () => {
    expect(JSON.stringify(LN0(baseLLN0))).to.equal(
      JSON.stringify(LN0(equalLLN0)),
    );
  });

  it("returns different description with unequal LN0 elements", () => {
    expect(JSON.stringify(LN0(baseLLN0))).to.not.equal(
      JSON.stringify(LN0(diffLLN0)),
    );
    expect(JSON.stringify(LN0(baseLLN0))).to.not.equal(
      JSON.stringify(LN0(diffEnumType)),
    );
  });
});
