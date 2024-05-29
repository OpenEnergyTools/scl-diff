import { expect } from "chai";
import { isDOTypeDescription } from "./DOType.js";
import { describeDO } from "./DODescription.js";
const scl = new DOMParser().parseFromString(`<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
    <DataTypeTemplates>      
        <LNodeType id="baseLNodeType" desc="desc" lnClass="XCBR">     
          <DO name="Pos" type="PosDOType1" desc="someDesc"/>
        </LNodeType>
        <LNodeType id="equalLNodeType" desc="desc" lnClass="XCBR">     
          <DO name="Pos" type="PosDOType2" desc="someDesc"/>
        </LNodeType>
        <LNodeType id="diffLNodeType" desc="desc" lnClass="XCBR">     
          <DO name="Pos" accessControl="accControl" transient="true" type="PosDOType2" desc="someDesc"/>
        </LNodeType>
        <LNodeType id="invalidLNodeType" desc="desc" lnClass="XCBR">     
          <DO name="Pos" type="invalidReference" desc="invalidReference"/>
          <DO name="Pos" type="invalidDOType" desc="invalidDOType"/>
        </LNodeType>
        <DOType cdc="CMV" id="PosDOType1">
            <DA name="stVal" bType="dbpos" fc="ST" />
        </DOType>
        <DOType cdc="CMV" id="PosDOType2">
            <DA name="stVal" bType="dbpos" fc="ST" />
        </DOType>
        <DOType id="invalidDOType">
            <DA name="stVal" bType="dbpos" fc="ST" />
        </DOType>
    </DataTypeTemplates>
    </SCL>`, "application/xml");
const baseDO = scl.querySelector(`#baseLNodeType > DO[name="Pos"]`);
const diffDO = scl.querySelector(`#diffLNodeType > DO[name="Pos"]`);
const equalDO = scl.querySelector(`#equalLNodeType > DO[name="Pos"]`);
const invalidReference = scl.querySelector(`#invalidLNodeType > DO[desc="invalidReference"]`);
const invalidDOType = scl.querySelector(`#invalidLNodeType > DO[desc="invalidDOType"]`);
describe("Description for SCL schema type DO", () => {
    it("returns property accessControl", () => {
        expect(describeDO(baseDO)).to.not.have.property("accessControl");
        expect(describeDO(diffDO)?.accessControl).to.equal("accControl");
    });
    it("returns property transient defaulting to false", () => {
        expect(describeDO(baseDO)).to.have.property("transient");
        expect(describeDO(baseDO)?.transient).to.equal(false);
        expect(describeDO(diffDO)).to.have.property("transient");
        expect(describeDO(diffDO)?.transient).to.equal(true);
    });
    it("returns property type DOTypeDescribe", () => {
        expect(describeDO(baseDO)?.type).to.satisfy(isDOTypeDescription);
        expect(describeDO(invalidReference)).to.be.undefined;
        expect(describeDO(invalidDOType)).to.be.undefined;
    });
    it("returns same description with semantically equal DO's", () => expect(JSON.stringify(describeDO(baseDO))).to.equal(JSON.stringify(describeDO(equalDO))));
    it("returns different description with unequal DO elements", () => {
        expect(JSON.stringify(describeDO(baseDO))).to.not.equal(JSON.stringify(describeDO(diffDO)));
    });
});
//# sourceMappingURL=DODescription.spec.js.map