import { expect } from "chai";
import { isDOTypeDescription } from "./DOType.js";
import { describeSDO } from "./SDODescription.js";
const scl = new DOMParser().parseFromString(`<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
    <DataTypeTemplates>      
        <DOType id="someEqual" desc="someDesc" cdc="MV">     
          <SDO name="phsA" type="CMVType" desc="someDesc"/>
          <SDO name="phsB" type="CMVType" desc="someDesc"/>
          <SDO name="phsC" type="CMVOtherType" desc="someDiff"/>
          <SDO name="res" type="someInvalidType"/>
          <SDO name="phsD" type="invalidDOType"/>
        </DOType>
        <DOType cdc="CMV" id="CMVType">
            <DA name="stVal" bType="FLOAT32" fc="MX" />
        </DOType>
        <DOType cdc="CMV" id="CMVOtherType">
            <DA name="q" bType="Quality" fc="MX" />
        </DOType>
        <DOType id="invalidDOType">
            <DA name="q" bType="Quality" fc="MX" />
        </DOType>
    </DataTypeTemplates>
    </SCL>`, "application/xml");
const baseSDO = scl.querySelector(`SDO[name="phsA"`);
const diffSDO = scl.querySelector(`SDO[name="phsC"`);
const equalSDO = scl.querySelector(`SDO[name="phsB"]`);
const invalidSDO = scl.querySelector(`SDO[name="res"`);
const invalidType = scl.querySelector(`SDO[name="phsD"`);
const orphanSDO = new DOMParser()
    .parseFromString(`<SDO name="hstVal" type="someReference" />`, "application/xml")
    .querySelector("SDO");
describe("Description for SCL schema type SDODescription", () => {
    it("returns property type DOTypeDescribe", () => {
        expect(describeSDO(baseSDO).type).to.satisfy(isDOTypeDescription);
        expect(describeSDO(invalidSDO)).to.be.undefined;
        expect(describeSDO(invalidType)).to.be.undefined;
        expect(describeSDO(orphanSDO)).to.be.undefined;
    });
    it("returns same description with semantically equal SDO's", () => expect(JSON.stringify(describeSDO(baseSDO))).to.equal(JSON.stringify(describeSDO(equalSDO))));
    it("returns different description with unequal SDO elements", () => expect(JSON.stringify(describeSDO(baseSDO))).to.not.equal(JSON.stringify(describeSDO(diffSDO))));
});
//# sourceMappingURL=SDODescription.spec.js.map