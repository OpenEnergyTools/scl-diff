import { expect } from "chai";

import { describe as describeSclElement } from "./describe.js";

const testScl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <Private type="someType" desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        <IED name="somePrivateIED"/>
      </Private>
      <Text>Some detailed description</Text>
      <ens:SomeNonSCLElement />
      <DataTypeTemplates>
        <EnumType id="someId">
            <EnumVal ord="1" desc="someDesc">A</EnumVal>
        </EnumType>
    </DataTypeTemplates>
    </SCL>`,
  "application/xml"
);

const privateElement = testScl.querySelector("Private")!;
const sclElement = testScl.querySelector("SCL")!;
const SomeNonSCLElement = testScl.querySelector("SomeNonSCLElement")!;
const textElement = testScl.querySelector("Text")!;
const enumValElement = testScl.querySelector("EnumVal")!;

describe("Describe SCL elements function", () => {
  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(SomeNonSCLElement)).to.be.undefined);

  it("returns undefined with missing describe function", () =>
    expect(describeSclElement(sclElement)).to.be.undefined);

  it("returns outerHTML for SCL element Private ", () =>
    expect(describeSclElement(privateElement)).to
      .equal(`<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="someType" desc="someDesc" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" sxy:x="10" xmlns:ens="http://somevalidURI" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        <IED name="somePrivateIED"/>
      </Private>`));

  it("returns outerHTML for SCL element Text ", () =>
    expect(describeSclElement(textElement)).to.equal(
      `<Text xmlns="http://www.iec.ch/61850/2003/SCL">Some detailed description</Text>`
    ));

  it("returns EnumValDescription for SCL element EnumVal ", () =>
    expect(describeSclElement(enumValElement)).to.deep.equal({
      ord: 1,
      desc: "someDesc",
      content: "A",
    }));
});
