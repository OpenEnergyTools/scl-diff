import { expect } from "chai";

import { newHasher } from "./hash.js";

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

// const sclElement = testScl.querySelector("SCL")!;
const nonSCLElement = testScl.querySelector("SomeNonSCLElement")!;

const baseEnumType = testScl.querySelector("#someID")!;
// const diffEnumType = testScl.querySelector("#someDiffID")!;
// const equalEnumType = testScl.querySelector("#someOtherID")!;

// const baseDAType = testScl.querySelector("#someBaseDAType")!;
// const baseDOType = testScl.querySelector("#someBaseDOType")!;
// const baseLNodeType = testScl.querySelector("#baseLLN0")!;

// const baseIED = testScl.querySelector(`IED[name="IED1"]`)!;
// const equalIED = testScl.querySelector(`IED[name="IED2"]`)!;
// const diffIED = testScl.querySelector(`IED[name="IED3"]`)!;

describe("hasher", () => {
  const { hash, db } = newHasher();
  // TODO(ca-d): test eNS attributes

  it("hashes unknown elements by outerHTML", () => {
    const digest = hash(nonSCLElement);
    const description =
      db[nonSCLElement.localName + "@" + nonSCLElement.namespaceURI][digest];
    expect(description).property("xml").to.equal(nonSCLElement.outerHTML);
  });

  it("hashes EnumTypes by EnumVals, Privates and Texts", () => {
    const digest = hash(baseEnumType);
    const description = db.EnumType[digest] as Record<string, string[]>;
    expect(description).property("@EnumVal").to.have.lengthOf(1);
    const val = db.EnumVal[description["@EnumVal"][0]];
    expect(val).to.exist.and.to.have.property("ord", 1);
    expect(val).to.have.property("val", "A");
    expect(description).property("@Private").to.have.lengthOf(1);
    const priv = db.Private[description["@Private"][0]];
    expect(priv).to.exist.and.to.have.property(
      "xml",
      baseEnumType.querySelector("Private")?.outerHTML,
    );
    expect(description).property("@Text").to.have.lengthOf(1);
    const text = db.Text[description["@Text"][0]];
    expect(text).to.exist.and.to.have.property(
      "xml",
      baseEnumType.querySelector("Text")?.outerHTML,
    );
  });

  after(() => {
    /*
    console.log(
      Array.from(testScl.querySelectorAll("IED")).map((ied) => hash(ied)),
    );
    Object.keys(db).forEach((key) => {
      console.log('expect(db["' + key + '"]).to.deep.equal(', db[key], ")");
    });
     */
  });
});
