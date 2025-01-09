import { expect } from "chai";
import { EnumType } from "./EnumType.js";
const scl = new DOMParser().parseFromString(`<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <EnumType id="someEqual" desc="someDesc">     
        <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"><someitem/></EnumVal>
      </EnumType>
      <EnumType id="someDifferent">     
        <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
      </EnumType>
      <EnumType id="someDifferent1" desc="someDesc">     
        <EnumVal ord="-1">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
      </EnumType>
      <EnumType id="someDifferent2" desc="someDesc">     
        <EnumVal ord="-3" desc="someDesc">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
      </EnumType>
      <EnumType id="someDifferent3" desc="someDesc">     
        <EnumVal ord="-1" desc="someDesc">SomeOtherContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
      </EnumType>
      <EnumType id="someEqual1" desc="someDesc">     
        <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
        <EnumVal >someInvalidSemantic</EnumVal>
        <EnumVal ord="someInvalidOrd">someOtherInvalidSemantic</EnumVal>
      </EnumType>
      <EnumType id="someOtherEqual" desc="someDesc">     
        <EnumVal ord="-1" desc="someDesc">SomeContent</EnumVal>
        <EnumVal ord="13">SomeOtherContent</EnumVal>
        <EnumVal ord="-23"></EnumVal>
      </EnumType>
    </SCL>`, "application/xml");
const equalEnumType = scl.querySelector("#someEqual");
const diffEnumVal1 = scl.querySelector("#someDifferent");
const diffEnumVal2 = scl.querySelector("#someDifferent1");
const diffEnumVal3 = scl.querySelector("#someDifferent2");
const diffEnumVal4 = scl.querySelector("#someDifferent3");
const diffEnumVal5 = scl.querySelector("#someEqual1");
const baseEnumType = scl.querySelector("#someOtherEqual");
describe("Description for SCL schema element tBaseElement", () => {
    it("returns property desc with existing desc attribute", () => expect(EnumType(baseEnumType)).to.haveOwnProperty("desc", "someDesc"));
    it("returns property enumVals with existing EnumVal children", () => {
        const enumVals = EnumType(baseEnumType).enumVals;
        const enumVal1 = enumVals[-1];
        expect(enumVal1).to.haveOwnProperty("desc", "someDesc");
        expect(enumVal1).to.haveOwnProperty("content", "SomeContent");
    });
    it("returns same description with semantically equal EnumType's", () => expect(JSON.stringify(EnumType(baseEnumType))).to.equal(JSON.stringify(EnumType(equalEnumType))));
    it("returns different description with unequal EnumType desc attribute", () => expect(JSON.stringify(EnumType(baseEnumType))).to.not.equal(JSON.stringify(EnumType(diffEnumVal1))));
    it("returns different description with unequal EnumVal desc attribute", () => expect(JSON.stringify(EnumType(baseEnumType))).to.not.equal(JSON.stringify(EnumType(diffEnumVal2))));
    it("returns different description with unequal EnumVal ord attributes", () => expect(JSON.stringify(EnumType(baseEnumType))).to.not.equal(JSON.stringify(EnumType(diffEnumVal3))));
    it("returns different description with unequal Private child element order", () => expect(JSON.stringify(EnumType(baseEnumType))).to.not.equal(JSON.stringify(EnumType(diffEnumVal4))));
    it("ignore schema invalid ord definition", () => expect(JSON.stringify(EnumType(baseEnumType))).to.equal(JSON.stringify(EnumType(diffEnumVal5))));
});
//# sourceMappingURL=EnumType.spec.js.map