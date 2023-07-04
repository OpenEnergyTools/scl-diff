import { expect } from "chai";
import { describeNaming } from "./Naming.js";

const scl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
    >
      <EnumType id="someEqual" desc="someDesc" />
      <EnumType id="someDifferent" />
      <EnumType id="someOtherEqual" desc="someDesc" />
    </SCL>`,
  "application/xml"
);

const baseElement = scl.querySelector("#someEqual")!;
const diffElement = scl.querySelector("#someDifferent")!;
const equalElement = scl.querySelector("#someOtherEqual")!;

describe("Description for SCL schema element tBaseElement", () => {
  it("returns property desc with existing desc attribute", () =>
    expect(describeNaming(baseElement)).to.haveOwnProperty("desc", "someDesc"));

  it("returns same description with semantically equal Naming type SCL element", () =>
    expect(JSON.stringify(describeNaming(baseElement))).to.equal(
      JSON.stringify(describeNaming(equalElement))
    ));

  it("returns different description with unequal Naming type SCL element", () =>
    expect(JSON.stringify(describeNaming(diffElement))).to.not.equal(
      JSON.stringify(describeNaming(equalElement))
    ));
});
