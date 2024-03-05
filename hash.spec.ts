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

const baseDAType = testScl.querySelector("#someBaseDAType")!;
const baseDOType = testScl.querySelector("#someBaseDOType")!;
const baseLNodeType = testScl.querySelector("#baseLLN0")!;

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

  it("hashes DATypes by BDAs and ProtNs", () => {
    hash(baseDAType);
    /*
    const digest = hash(baseDAType);
    const description = db.DAType[digest] as Record<string, string[]>;
    expect(description).to.deep.equal({
      // FIXME(ca-d): define correct behaviour
      "@BDA": ["18d6c93b2cc1cc55", "dd9f5c7e69b1708c"],
      "@ProtNs": ["4fd2d8f99b2f756a"],
    });
     */
    // TODO(ca-d): test siblingCount
  });

  it("hashes DOTypes by DAs and SDOs", () => {
    hash(baseDOType);
    /*
    const digest = hash(baseDOType);
    const description = db.DOType[digest] as Record<string, string[]>;
    expect(description).to.deep.equal({
      // FIXME(ca-d): define correct behaviour
      "@DA": ["74871b9108bd5768"],
      cdc: "SPS",
    });
     */
  });

  it("hashes LNodeTypes by DOs", () => {
    hash(baseLNodeType);
    /*
    const digest = hash(baseLNodeType);
    const description = db.LNodeType[digest] as Record<string, string[]>;
    expect(description).to.deep.equal({
      // FIXME(ca-d): define correct behaviour
      "@DO": ["4c6e42c7c8b0797f"],
      lnClass: "LLN0",
    });
     */
  });

  it("hashes LNodeTypes by DOs", () => {
    hash(testScl.querySelector("DataTypeTemplates")!);
  });

  after(() => {
    /* // primivite snapshot test - uncomment to update
    Object.keys(db).forEach((key) => {
      console.log('expect(db["' + key + '"]).to.deep.equal(', db[key], ")");
    });
     */
    expect(db["SomeNonSCLElement@http://somevalidURI"]).to.deep.equal({
      b6712fb57eb0e24b: {
        xml: '<ens:SomeNonSCLElement xmlns:ens="http://somevalidURI"/>',
      },
    });
    expect(db.Private).to.deep.equal({
      "082c018bb12fb5e5": {
        xml:
          '<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="someType" desc="someDesc" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" sxy:x="10" xmlns:ens="http://somevalidURI" ens:some="someOtherNameSpace">\n' +
          "          <![CDATA[some comment]]>\n" +
          '          <IED name="somePrivateIED"/>\n' +
          "        </Private>",
      },
      "878b5b8db7dc9340": {
        xml:
          '<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="someType" desc="someDesc" xmlns:ens="http://somevalidURI" ens:some="someOtherNameSpace" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" sxy:x="10">\n' +
          "          <![CDATA[some comment]]>\n" +
          '          <IED name="somePrivateIED"/>\n' +
          "        </Private>",
      },
    });
    expect(db.Text).to.deep.equal({
      "6e995d62cc5f8f1a": {
        xml: '<Text xmlns="http://www.iec.ch/61850/2003/SCL">Some detailed description</Text>',
      },
    });
    expect(db.EnumVal).to.deep.equal({
      "8f561e2a03513559": { ord: 1, val: "A" },
      "25599d957ef37857": { ord: -1, val: "SomeContent" },
      ef0565086e00a6e5: { ord: 13, val: "SomeOtherContent" },
      "7332c15a44952cce": { ord: -23, val: "" },
      "728b4a0f4332e9c5": { ord: 1, val: "" },
    });
    expect(db.EnumType).to.deep.equal({
      c2541301f8126d77: {
        "@Private": ["082c018bb12fb5e5"],
        "@Text": ["6e995d62cc5f8f1a"],
        "@ens:SomeNonSCLElement": ["b6712fb57eb0e24b"],
        "@EnumVal": ["8f561e2a03513559"],
      },
      "52e71c8529bf548f": {
        "@EnumVal": [
          "25599d957ef37857",
          "7332c15a44952cce",
          "ef0565086e00a6e5",
        ],
      },
      "01bfdeb82adbbab3": {
        "@Private": ["878b5b8db7dc9340"],
        "@Text": ["6e995d62cc5f8f1a"],
        "@ens:SomeNonSCLElement": ["b6712fb57eb0e24b"],
        "@EnumVal": ["728b4a0f4332e9c5"],
      },
    });
    expect(db.Val).to.deep.equal({
      "4841a3d87b04aa9b": { val: "45.00", sGroup: 1 },
      "0fc915000247dd52": { val: "65.00", sGroup: 2 },
    });
    expect(db.BDA).to.deep.equal({
      a99636321898296f: {
        "@Val": ["0fc915000247dd52", "4841a3d87b04aa9b"],
        bType: "FLOAT32",
        valImport: true,
        valKind: "RO",
        count: 0,
      },
      "017e02f18557b8a3": {
        bType: "Struct",
        sAddr: "someSAddr",
        valKind: "Set",
        valImport: false,
        count: 0,
        "@DAType": ["c579130da5263aca"],
      },
      "0ad0aa080b280458": {
        bType: "Enum",
        sAddr: "someSAddr",
        valKind: "Set",
        valImport: false,
        count: 0,
        "@EnumType": ["52e71c8529bf548f"],
      },
    });
    expect(db.DAType).to.deep.equal({
      c579130da5263aca: {
        "@BDA": ["a99636321898296f"],
        iedType: "someIedType",
      },
      d322e88e06132d1b: {
        "@BDA": ["017e02f18557b8a3", "0ad0aa080b280458"],
        "@ProtNs": ["4fd2d8f99b2f756a"],
      },
    });
    expect(db.ProtNs).to.deep.equal({
      "4fd2d8f99b2f756a": { type: "8-MMS", val: "IEC 61850-8-1:2007" },
    });
    expect(db.DA).to.deep.equal({
      d567af79f866336f: {
        bType: "Struct",
        fc: "ST",
        valKind: "Set",
        valImport: false,
        count: 0,
        "@DAType": ["d322e88e06132d1b"],
      },
      "745036cf3aa59119": {
        bType: "Enum",
        fc: "ST",
        valKind: "Set",
        valImport: false,
        count: 0,
        "@EnumType": ["c2541301f8126d77"],
      },
    });
    expect(db.DOType).to.deep.equal({
      "8eaab6c78d2cf143": { cdc: "SPS", "@DA": ["d567af79f866336f"] },
      d359de8b7fddee2c: { cdc: "SPS", "@DA": ["745036cf3aa59119"] },
    });
    expect(db.DO).to.deep.equal({
      "2b5d2e745d7551b4": { "@DOType": ["8eaab6c78d2cf143"] },
      "80c83ba21492936c": { "@DOType": ["d359de8b7fddee2c"] },
    });
    expect(db.LNodeType).to.deep.equal({
      "4e0619031232ec6e": { "@DO": ["2b5d2e745d7551b4"], lnClass: "LLN0" },
      ef46e239e70ddbc9: { "@DO": ["80c83ba21492936c"], lnClass: "LLN0" },
      aeb05f6e8affc23a: { "@DO": ["2b5d2e745d7551b4"], lnClass: "XCBR" },
      "99a26557bf1bb276": { "@DO": ["80c83ba21492936c"], lnClass: "XCBR" },
    });
    expect(db.DataTypeTemplates).to.deep.equal({
      bc00e9afa5b7022e: {
        "@LNodeType": [
          "4e0619031232ec6e",
          "4e0619031232ec6e",
          "99a26557bf1bb276",
          "aeb05f6e8affc23a",
          "aeb05f6e8affc23a",
          "ef46e239e70ddbc9",
        ],
        "@DOType": ["8eaab6c78d2cf143", "8eaab6c78d2cf143", "d359de8b7fddee2c"],
        "@DAType": ["c579130da5263aca", "d322e88e06132d1b", "d322e88e06132d1b"],
        "@EnumType": [
          "01bfdeb82adbbab3",
          "52e71c8529bf548f",
          "c2541301f8126d77",
          "c2541301f8126d77",
        ],
      },
    });
  });
});
