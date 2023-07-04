import { expect } from "chai";

import { describe as describeSclElement } from "./describe.js";

const testScl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <DataTypeTemplates>
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
        <Private type="someType" desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
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
  "application/xml"
);

const sclElement = testScl.querySelector("SCL")!;
const omeNonSCLElement = testScl.querySelector("SomeNonSCLElement")!;

const baseEnumType = testScl.querySelector("#someID")!;
const diffEnumType = testScl.querySelector("#someDiffID")!;
const equalEnumType = testScl.querySelector("#someOtherID")!;

describe("Describe SCL elements function", () => {
  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(omeNonSCLElement)).to.be.undefined);

  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(sclElement)).to.be.undefined);

  it("return equal description with semantically equal SCL element", () =>
    expect(JSON.stringify(describeSclElement(baseEnumType))).to.equal(
      JSON.stringify(describeSclElement(equalEnumType))
    ));

  it("return different description with semantically unequal SCL element", () =>
    expect(JSON.stringify(describeSclElement(diffEnumType))).to.not.equal(
      JSON.stringify(describeSclElement(equalEnumType))
    ));
});
