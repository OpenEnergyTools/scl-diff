import { expect } from "chai";
import { describeBaseElement } from "./BaseElement";

const scl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <EnumType id="someEqual" desc="someDesc" ens:some="someOtherNamespace" sxy:x="1" sxy:y="3">
        <Private type="somePrivate">SomePrivateContent</Private>
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <Text>SomeTextContent</Text>      
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someDifferent" desc="someDesc" ens:some="someOtherNamespace" sxy:x="1">
        <Private type="somePrivate">SomePrivateContent</Private>
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <Text>SomeTextContent</Text>      
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someDifferent1" desc="someDesc" ens:some="someOtherNamespace" sxy:x="1" sxy:y="3">
        <Private type="somePrivate">SomePrivateContent</Private>
        <Text>SomeTextContent</Text>      
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someDifferent2" desc="someDesc" ens:some="someOtherNamespace" sxy:x="1" sxy:y="3">
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <Private type="somePrivate">SomePrivateContent</Private>
        <Text>SomeTextContent</Text>      
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someDifferent3" desc="someDesc" ens:some="someOtherNamespace" sxy:x="1" sxy:y="3">
        <Private type="somePrivate">SomePrivateContent</Private>
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someDifferent4" desc="someDesc" sxy:y="3" ens:some="someOtherNamespace" sxy:x="1">
        <Private type="somePrivate">SomePrivateContent</Private>
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <Text>SomeTextContent</Text>
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
      <EnumType id="someOtherEqual" ens:some="someOtherNamespace" sxy:x="1" sxy:y="3">
        <Text>SomeTextContent</Text>
        <Private type="somePrivate">SomePrivateContent</Private>
        <Private type="someOtherPrivate">SomeOtherPrivateContent</Private>
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
      </EnumType>
    </SCL>`,
  "application/xml"
);

const baseElement = scl.querySelector("#someEqual")!;
const diffElement1 = scl.querySelector("#someDifferent")!;
const diffElement2 = scl.querySelector("#someDifferent1")!;
const diffElement3 = scl.querySelector("#someDifferent2")!;
const diffElement4 = scl.querySelector("#someDifferent3")!;
const diffElement5 = scl.querySelector("#someDifferent4")!;
const equalElement = scl.querySelector("#someOtherEqual")!;

describe("Description for SCL element typed tBaseElement", () => {
  it("return a string array each per child Private element", () => {
    const privates = describeBaseElement(baseElement).privates;
    expect(privates).to.not.be.undefined;
    expect(privates.length).to.equal(2);
  });

  it("return a string array each per child Text element", () => {
    const texts = describeBaseElement(baseElement).texts;
    expect(texts).to.not.be.undefined;
    expect(texts.length).to.equal(1);
  });

  it("return a record for attributes outside the SCL target namespace", () => {
    const attributes = describeBaseElement(baseElement).eNSAttributes;
    expect(attributes).to.not.be.undefined;
    expect(attributes["http://somevalidURI"]["ens:some"]).to.equal(
      "someOtherNamespace"
    );
    expect(
      attributes["http://www.iec.ch/61850/2003/SCLcoordinates"]["sxy:x"]
    ).to.equal("1");
    expect(
      attributes["http://www.iec.ch/61850/2003/SCLcoordinates"]["sxy:y"]
    ).to.equal("3");
  });

  it("returns same description with semantically equal SCL element", () =>
    expect(JSON.stringify(describeBaseElement(baseElement))).to.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));

  it("returns different description with unequal extra namespace attributes", () =>
    expect(JSON.stringify(describeBaseElement(diffElement1))).to.not.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));

  it("returns different description with unequal Private child element", () =>
    expect(JSON.stringify(describeBaseElement(diffElement2))).to.not.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));

  it("returns different description with unequal Text child element", () =>
    expect(JSON.stringify(describeBaseElement(diffElement4))).to.not.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));

  it("returns different description with unequal Private child element order", () =>
    expect(JSON.stringify(describeBaseElement(diffElement3))).to.not.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));

  it("is insensitive to any attribute order", () =>
    expect(JSON.stringify(describeBaseElement(diffElement5))).to.equal(
      JSON.stringify(describeBaseElement(equalElement))
    ));
});
