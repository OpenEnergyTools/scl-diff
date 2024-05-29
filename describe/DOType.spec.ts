import { expect } from "chai";

import { DOType } from "./DOType.js";
import { describeSDO } from "./SDODescription.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
    <DataTypeTemplates>      
        <DOType id="someBase" desc="someDesc" cdc="MV">     
          <SDO name="phsA" type="CMVType" desc="someDesc"/>
          <SDO name="phsB" type="CMVType" desc="someDesc"/>
          <SDO name="phsC" type="CMVOtherType" desc="someDiff"/>
          <DA name="stVal" bType="BOOLEAN" fc="ST" />
          <DA name="q" bType="Quality" fc="ST" />
        </DOType>
        <DOType id="someEqual" desc="someDesc" cdc="MV">     
          <SDO name="phsB" type="CMVType" desc="someDesc"/>
          <SDO name="phsA" type="CMVType" desc="someDesc"/>
          <SDO name="phsC" type="CMVOtherType" desc="someDiff"/>
          <DA name="q" bType="Quality" fc="ST" />
          <DA name="stVal" bType="BOOLEAN" fc="ST" />
        </DOType>
        <DOType cdc="CMV" id="CMVType" iedType="someIedType">
            <DA name="stVal" bType="FLOAT32" fc="MV" />
        </DOType>
        <DOType cdc="CMV" id="CMVOtherType">
            <DA name="q" bType="Quality" fc="MV" />
        </DOType>
        <DOType id="missingCDC">
            <DA name="q" bType="Quality" fc="MV" />
        </DOType>
        <DOType cdc="invalidCDC" id="invalidCDC">
            <DA name="q" bType="Quality" fc="MV" />
        </DOType>
        <DOType cdc="CMV" id="invalidChildSDO">
            <SDO name="phsA" bType="Struct" type="invalidDOType" fc="MV" />
        </DOType>
    </DataTypeTemplates>
    </SCL>`,
  "application/xml",
);

const baseDOType = scl.querySelector(`#someBase`)!;
const equalDOType = scl.querySelector(`#someEqual`)!;
const diffDOType = scl.querySelector(`#CMVType`)!;

const missingCDC = scl.querySelector(`#missingCDC`)!;
const invalidCDC = scl.querySelector(`#invalidCDC`)!;
const invalidChildSDO = scl.querySelector(`#invalidChildSDO`)!;

describe("Description for SCL schema type DOTypeDescription", () => {
  it("returns undefined with missing cdc", () =>
    expect(DOType(missingCDC)).to.be.undefined);

  it("returns undefined with invalid cdc", () =>
    expect(DOType(invalidCDC)).to.be.undefined);

  it("returns property cdc", () =>
    expect(DOType(baseDOType)!.cdc).to.equal("MV"));

  it("returns property iedType", () => {
    expect(DOType(diffDOType)!.iedType).to.equal("someIedType");
    expect(DOType(baseDOType)!.iedType).to.be.undefined;
  });

  it("does not add undefined SDO child elements", () => {
    expect(DOType(invalidChildSDO)?.sdos).to.not.have.property("phsA");
  });

  it("returns same description with semantically equal DOType's", () => {
    expect(JSON.stringify(DOType(baseDOType))).to.equal(
      JSON.stringify(DOType(equalDOType)),
    );
  });

  it("returns different description with unequal DOType elements", () =>
    expect(JSON.stringify(DOType(baseDOType))).to.not.equal(
      JSON.stringify(DOType(diffDOType)),
    ));
});
