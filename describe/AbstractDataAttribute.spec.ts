import { expect } from "chai";

import { describeDAorSDAorDAI } from "./AbstractDataAttribute.js";
import { isEnumTypeDescription } from "./EnumType.js";
import { isDATypeDescription } from "./DAType.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
    <DataTypeTemplates>      
        <DAType id="baseDAType" desc="someDesc">     
          <BDA name="mag" desc="desc" bType="Struct" sAddr="someSAddr" type="AnalogueValue">
            <Val sGroup="1">40.20</Val>
            <Val sGroup="2">20.20</Val>
          </BDA>
          <BDA name="stVal" desc="someEnumBDA" bType="Enum" sAddr="someSAddr" type="someEnumType"/>
        </DAType>
        <DAType id="equalDAType" desc="someDesc">     
          <BDA name="mag" desc="desc" bType="Struct" sAddr="someSAddr" type="AnalogueValue">
            <Val sGroup="2">20.20</Val>
            <Val sGroup="1">40.20</Val>
          </BDA>
          <BDA name="stVal" desc="someEnumBDA" bType="Enum" sAddr="someSAddr" type="someEnumType"/>
        </DAType>
        <DAType id="AnalogueValue">
            <BDA desc="someDiff1" name="f" bType="FLOAT32" valKind="RO" valImport="true">
                <Val>45.00</Val>
            </BDA>
        </DAType>
        <DAType id="daTypeCollection">
          <BDA name="mag" desc="desc" bType="Struct" sAddr="someSAddr" type="AnalogueValue"/>
          <BDA name="cVal" desc="missingBType" />
          <BDA name="hstRangeC" desc="arrayBDA" bType="FLOAT32" count="34" />
          <BDA name="hstVal" desc="refArrayBDA" bType="FLOAT32" count="hstRangeC" />
          <BDA name="hstVal" desc="invalidRefArrayBDA" bType="FLOAT32" count="invalidRef" />
          <BDA name="missingCount" bType="FLOAT32" />
          <BDA name="hstVal" desc="missingRefArrayBDA" bType="FLOAT32" count="missingCount" />
          <BDA name="invalidSiblingCount" bType="FLOAT32" count="sad34asdf" />
          <BDA name="hstVal" desc="invalidSiblingCount" bType="FLOAT32" count="invalidSiblingCount" />
          <BDA desc="someDiff3" name="f" bType="FLOAT32" valKind="RO" valImport="true">
            <Val sGroup="1">45.00</Val>
            <Val sGroup="2">55.00</Val>
          </BDA>
        </DAType>
        <EnumType id="someEnumType" desc="someDesc">     
          <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
          <EnumVal ord="13">SomeOtherContent</EnumVal>
          <EnumVal ord="-23"></EnumVal>
        </EnumType>
    </DataTypeTemplates>
    </SCL>`,
  "application/xml"
);

const baseBDA = scl.querySelector(`#baseDAType>BDA`)!;
const equalBDA = scl.querySelector(`#equalDAType>BDA`)!;

const orphanBDA = new DOMParser()
  .parseFromString(
    `<BDA name="hstVal" desc="refArrayBDA" bType="FLOAT32" count="hstRangeC" />`,
    "application/xml"
  )
  .querySelector("BDA")!;

const missingBType = scl.querySelector(`BDA[desc="missingBType"`)!;
const refInvalidCount = scl.querySelector(`BDA[desc="invalidRefArrayBDA"`)!;
const refInvalidSiblingCount = scl.querySelector(
  `BDA[desc="invalidSiblingCount"`
)!;
const refMissingCount = scl.querySelector(`BDA[desc="missingRefArrayBDA"`)!;
const refValidCount = scl.querySelector(`BDA[desc="refArrayBDA"`)!;
const directCount = scl.querySelector(`BDA[desc="arrayBDA"`)!;

const diffBDA1 = scl.querySelector(`BDA[desc="someDiff1"`)!;
const diffBDA2 = scl.querySelector(`BDA[desc="someEnumBDA"`)!;
const diffBDA3 = scl.querySelector(`BDA[desc="someDiff3"`)!;

describe("Description for SCL schema type tAbstractDataAttribute", () => {
  it("returns property sAddr with existing sAddr attribute", () => {
    expect(describeDAorSDAorDAI(baseBDA)).to.have.property(
      "sAddr",
      "someSAddr"
    );
    expect(describeDAorSDAorDAI(diffBDA1)).to.not.have.property("sAddr");
  });

  it("returns property valKind defaulted to 'Set' ", () => {
    expect(describeDAorSDAorDAI(baseBDA)).to.have.property("valKind", "Set");
    expect(describeDAorSDAorDAI(diffBDA1)).to.have.property("valKind", "RO");
  });

  it("returns property valImport defaulted to false", () => {
    expect(describeDAorSDAorDAI(baseBDA)).to.have.property("valImport", false);
    expect(describeDAorSDAorDAI(diffBDA1)).to.have.property("valImport", true);
  });

  it("returns property bType or 'undefined' if missing ", () => {
    expect(describeDAorSDAorDAI(diffBDA1)).to.have.property("bType", "FLOAT32");
    expect(describeDAorSDAorDAI(missingBType)).to.have.property(
      "bType",
      "undefined"
    );
  });

  it("returns property count directly or through reference", () => {
    expect(describeDAorSDAorDAI(directCount)).to.have.property("count", 34);
    expect(describeDAorSDAorDAI(refValidCount)).to.have.property("count", 34);
  });

  it("defaults property count 0 if cannot be determined", () => {
    expect(describeDAorSDAorDAI(orphanBDA)).to.have.property("count", 0);

    expect(describeDAorSDAorDAI(refInvalidCount)).to.have.property("count", 0);

    expect(describeDAorSDAorDAI(refMissingCount)).to.have.property("count", 0);

    expect(describeDAorSDAorDAI(refInvalidSiblingCount)).to.have.property(
      "count",
      0
    );
  });

  it("returns property type when bType Enum or Struct", () => {
    expect(describeDAorSDAorDAI(diffBDA1)).to.not.have.property("type");

    expect(describeDAorSDAorDAI(baseBDA).type).to.satisfy(isDATypeDescription);

    expect(describeDAorSDAorDAI(diffBDA2).type).to.satisfy(
      isEnumTypeDescription
    );
  });

  it("returns property val with existing Val children", () => {
    expect(describeDAorSDAorDAI(diffBDA1).vals.length).to.equal(1);
    expect(describeDAorSDAorDAI(diffBDA3).vals.length).to.equal(2);
    expect(describeDAorSDAorDAI(diffBDA3).vals[1].sGroup).to.equal(2);
    expect(describeDAorSDAorDAI(diffBDA3).vals[1].val).to.equal("55.00");
  });

  it("returns same description with semantically equal BDA's", () =>
    expect(JSON.stringify(describeDAorSDAorDAI(baseBDA))).to.equal(
      JSON.stringify(describeDAorSDAorDAI(equalBDA))
    ));

  it("returns different description with unequal BDA elements", () =>
    expect(JSON.stringify(describeDAorSDAorDAI(baseBDA))).to.not.equal(
      JSON.stringify(describeDAorSDAorDAI(diffBDA2))
    ));
});
