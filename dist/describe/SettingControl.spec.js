import { expect } from "chai";
import { describeSettingControl } from "./SettingControl.js";
const scl = new DOMParser().parseFromString(`<SCL xmlns="http://www.iec.ch/61850/2003/SCL">
    <LN0 desc="invalid" lnClass="LLN0" >
        <SettingControl />
    </LN0>
    <LN0 desc="diff" lnClass="LLN0" >
        <SettingControl numOfSGs="2" />
    </LN0>
    <LN0 desc="base" lnClass="LLN0" >
        <SettingControl numOfSGs="2" actSG="2" resvTms="345" />
    </LN0>
    <LN0 desc="equal" lnClass="LLN0" >
        <SettingControl numOfSGs="2" actSG="2" resvTms="345" />
    </LN0>
  </SCL>`, "application/xml");
const baseSettingControl = scl.querySelector('LN0[desc="base"] > SettingControl');
const equalSettingControl = scl.querySelector('LN0[desc="equal"] > SettingControl');
const diffSettingControl = scl.querySelector('LN0[desc="diff"] > SettingControl');
const invalidSettingControl = scl.querySelector('LN0[desc="invalid"] > SettingControl');
describe("Describes the SCL element SettingControl", () => {
    it("returns undefined with missing numOfSGs ", () => expect(describeSettingControl(invalidSettingControl)).to.be.undefined);
    it("returns equal description with semantically equal SettingControl element", () => expect(JSON.stringify(describeSettingControl(baseSettingControl))).to.equal(JSON.stringify(describeSettingControl(equalSettingControl))));
    it("returns different description with semantically different SettingControl element", () => {
        expect(JSON.stringify(describeSettingControl(baseSettingControl))).to.not.equal(JSON.stringify(describeSettingControl(diffSettingControl)));
    });
});
//# sourceMappingURL=SettingControl.spec.js.map