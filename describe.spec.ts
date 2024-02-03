import { expect } from "chai";

import { describe as describeSclElement } from "./describe.js";

const testScl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <IED name="IED1">
        <AccessPoint name="AP1">
          <Server>
            <Authentication />
            <LDevice inst="ldInst1">
              <LN0 lnClass="LLN0" inst="" lnType="baseLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="baseXCBR"/>
            </LDevice>
            <LDevice inst="ldInst2">
              <LN0 lnClass="LLN0" inst="" lnType="equalLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="equalXCBR"/>
              </LDevice>
            <LDevice inst="ldInst3">
              <LN0 lnClass="LLN0" inst="" lnType="diffLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="diffXCBR"/>
              </LDevice>
          </Server>
        </AccessPoint>
      </IED>
      <IED name="IED2">
        <AccessPoint name="AP1">
          <Server>
            <Authentication />
            <LDevice inst="ldInst1">
              <LN0 lnClass="LLN0" inst="" lnType="baseLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="baseXCBR"/>
            </LDevice>
            <LDevice inst="ldInst2">
              <LN0 lnClass="LLN0" inst="" lnType="equalLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="equalXCBR"/>
              </LDevice>
            <LDevice inst="ldInst3">
              <LN0 lnClass="LLN0" inst="" lnType="diffLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="diffXCBR"/>
              </LDevice>
          </Server>
        </AccessPoint>
      </IED>
      <IED name="IED3">
        <AccessPoint name="AP1">
          <Server>
            <Authentication />
            <LDevice inst="ldInst1">
              <LN0 lnClass="LLN0" inst="" lnType="baseLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="baseXCBR"/>
            </LDevice>
            <LDevice inst="ldInst2">
              <LN0 lnClass="LLN0" inst="" lnType="equalLLN0"/>
              <LN lnClass="XCBR" inst="1" lnType="equalXCBR"/>
              </LDevice>
          </Server>
        </AccessPoint>
      </IED>
      <DataTypeTemplates>
        <LNodeType lnClass="LLN0" id="baseLLN0" >
          <DO name="Beh" type="someEqualDOType" />
        </LNodeType>
        <LNodeType lnClass="LLN0" id="equalLLN0" >
          <DO name="Beh" type="someEqualDOType" />
        </LNodeType>
        <LNodeType lnClass="LLN0" id="diffLLN0" >
          <DO name="Beh" type="someDiffDOType" />
        </LNodeType>
        <LNodeType lnClass="XCBR" id="equalXCBR" >
          <DO name="Beh" type="someEqualDOType" />
        </LNodeType>
        <LNodeType lnClass="XCBR" id="baseXCBR" >
          <DO name="Beh" type="someBaseDOType" />
        </LNodeType>
        <LNodeType lnClass="XCBR" id="diffXCBR" >
          <DO name="Beh" type="someDiffDOType" />
        </LNodeType>
        <DOType cdc="SPS" id="someBaseDOType">
          <DA name="stVal" bType="Struct" fc="ST" type="someBaseDAType" />
        </DOType>
        <DOType cdc="SPS" id="someEqualDOType">
          <DA name="stVal" bType="Struct" fc="ST" type="someEqualDAType" />
        </DOType>
        <DOType cdc="SPS" id="someDiffDOType">
          <DA name="stVal" bType="Enum" fc="ST" type="someID" />
        </DOType>
        <DAType id="someBaseDAType" desc="someDesc">     
          <BDA name="mag" desc="someEqual" bType="Struct" sAddr="someSAddr" type="AnalogueValue"/>
          <BDA name="stVal" desc="someEnumBDA" bType="Enum" sAddr="someSAddr" type="someEnumType"/>
          <ProtNs type="8-MMS">IEC 61850-8-1:2007</ProtNs>
        </DAType>
        <DAType id="someEqualDAType" desc="someDesc">     
          <BDA name="mag" desc="someEqual" bType="Struct" sAddr="someSAddr" type="AnalogueValue"/>
          <BDA name="stVal" desc="someEnumBDA" bType="Enum" sAddr="someSAddr" type="someEnumType"/>
          <ProtNs>IEC 61850-8-1:2007</ProtNs>
        </DAType>
        <DAType id="AnalogueValue" iedType="someIedType">
            <BDA desc="someDiff1" name="f" bType="FLOAT32" valKind="RO" valImport="true">
                <Val sGroup="1">45.00</Val>
                <Val sGroup="2">65.00</Val>
            </BDA>
        </DAType>
        <EnumType id="someEnumType" desc="someDesc">     
          <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
          <EnumVal ord="13">SomeOtherContent</EnumVal>
          <EnumVal ord="-23"></EnumVal>
      </EnumType>
      <EnumType id="someID">
        <Private type="someType" desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
          <![CDATA[some comment]]>
          <IED name="somePrivateIED"/>
        </Private>
        <Text>Some detailed description</Text>
        <ens:SomeNonSCLElement />
        <EnumVal ord="1">A</EnumVal>
      </EnumType>
      <EnumType id="someDiffID" >
        <Private type="someType" desc="someDesc" ens:some="someOtherNameSpace" sxy:x="10" >
          <![CDATA[some comment]]>
          <IED name="somePrivateIED"/>
        </Private>
        <Text>Some detailed description</Text>
        <ens:SomeNonSCLElement />
        <EnumVal ord="1"></EnumVal>
      </EnumType>
      <EnumType id="someOtherID">
        <Private type="someType" desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
          <![CDATA[some comment]]>
          <IED name="somePrivateIED"/>
        </Private>
        <Text>Some detailed description</Text>
        <ens:SomeNonSCLElement />
        <EnumVal ord="1">A</EnumVal>
      </EnumType>
      </DataTypeTemplates>
    </SCL>`,
  "application/xml",
);

const sclElement = testScl.querySelector("SCL")!;
const oneNonSCLElement = testScl.querySelector("SomeNonSCLElement")!;

const baseEnumType = testScl.querySelector("#someID")!;
const diffEnumType = testScl.querySelector("#someDiffID")!;
const equalEnumType = testScl.querySelector("#someOtherID")!;

const baseAP = testScl.querySelector(`IED[name="IED1"]>AccessPoint`)!;
const equalAP = testScl.querySelector(`IED[name="IED2"]>AccessPoint`)!;
const diffAP = testScl.querySelector(`IED[name="IED3"]>AccessPoint`)!;

describe("Describe SCL elements function", () => {
  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(oneNonSCLElement)).to.be.undefined);

  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(sclElement)).to.be.undefined);

  it("return equal description with semantically equal SCL element", () =>
    expect(JSON.stringify(describeSclElement(baseEnumType))).to.equal(
      JSON.stringify(describeSclElement(equalEnumType)),
    ));

  it("return different description with semantically unequal SCL element", () =>
    expect(JSON.stringify(describeSclElement(diffEnumType))).to.not.equal(
      JSON.stringify(describeSclElement(equalEnumType)),
    ));

  it("returns same description with semantically equal AccessPoint's", () =>
    expect(JSON.stringify(describeSclElement(baseAP))).to.equal(
      JSON.stringify(describeSclElement(equalAP)),
    ));

  it("returns different description with unequal AccessPoint elements", () =>
    expect(JSON.stringify(describeSclElement(baseAP))).to.not.equal(
      JSON.stringify(describeSclElement(diffAP)),
    ));
});
