import { expect } from "chai";

import { EnumVal } from "./EnumVal.js";

const scl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
    >
    <DataTypeTemplates>
        <EnumType id="someId">
            <EnumVal ord="1" desc="someDesc">A</EnumVal>
            <EnumVal ord="2"></EnumVal>
            <EnumVal ord="nonsense"></EnumVal>
        </EnumType>
    </DataTypeTemplates>  
    </SCL>`,
  "application/xml"
);

const enumVal = scl.querySelector('EnumVal[ord="1"]')!;
const enumValMissingContent = scl.querySelector('EnumVal[ord="2"]')!;
const nonSenseOrd = scl.querySelector('EnumVal[ord="nonsense"]')!;

describe("Description for SCL element EnumVal", () => {
  it("return ord, desc attribute and innerText content ", () =>
    expect(EnumVal(enumVal)).to.deep.equal({
      ord: 1,
      desc: "someDesc",
      content: "A",
    }));

  it("indicates missing innerText with undefined content", () =>
    expect(EnumVal(enumValMissingContent)).to.not.have.property("content"));

  it("indicates missing desc attribute with undefined desc", () =>
    expect(EnumVal(enumValMissingContent)).to.not.have.property("desc"));

  it("indicates non sense ord attribute with NaN", () =>
    expect(EnumVal(nonSenseOrd)).to.deep.equal({
      ord: NaN,
    }));
});
