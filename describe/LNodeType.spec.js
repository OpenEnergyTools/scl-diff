import { expect } from "chai";
import { LNodeType } from "./LNodeType.js";
const scl = new DOMParser().parseFromString(`<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
    <DataTypeTemplates>      
        <LNodeType id="baseLNodeType" desc="desc" lnClass="XCBR">     
            <DO name="Pos1" type="PosDOType1" desc="someDesc"/>
            <DO name="Pos2" type="PosDOType2" desc="someDesc"/>
        </LNodeType>
        <LNodeType id="equalLNodeType" desc="desc" lnClass="XCBR">     
            <DO name="Pos2" type="PosDOType2" desc="someDesc"/>
            <DO name="Pos1" type="PosDOType1" desc="someDesc"/>
        </LNodeType>
        <LNodeType id="diffLNodeType" desc="desc" lnClass="XCBR" iedType="someIedType">     
            <DO name="Pos1" accessControl="accControl" transient="true" type="PosDOType2" desc="someDesc"/>
            <DO name="Pos2" type="invalidReference" desc="invalidReference"/>
            <DO name="Pos3" type="invalidDOType" desc="invalidDOType"/>
        </LNodeType>
        <LNodeType id="invalidLNodeType" desc="desc" >     
            <DO name="Pos1" type="PosDOType1" desc="someDesc"/>
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
const baseLNodeType = scl.querySelector(`#baseLNodeType`);
const diffLNodeType = scl.querySelector(`#diffLNodeType`);
const equalLNodeType = scl.querySelector(`#equalLNodeType`);
const lNodeWithInvalidDOs = scl.querySelector(`#invalidLNodeType`);
const orphanLNode = new DOMParser()
    .parseFromString(`<LNodeType id="orphanLNode" lnClass="PTOC" >
      <DO name="Pos" type="doType" />
    </LNodeType>`, "application/xml")
    .querySelector("LNodeType");
describe("Description for SCL schema type LNodeType", () => {
    it("returns undefined with missing lnClass", () => expect(LNodeType(lNodeWithInvalidDOs)).to.be.undefined);
    it("returns property lnClass", () => expect(LNodeType(baseLNodeType)?.lnClass).to.equal("XCBR"));
    it("returns property iedType", () => {
        expect(LNodeType(diffLNodeType).iedType).to.equal("someIedType");
        expect(LNodeType(baseLNodeType).iedType).to.be.undefined;
    });
    it("does not add undefined DODescription to as DO children", () => {
        expect(LNodeType(diffLNodeType)?.dos).to.have.property("Pos1");
        expect(LNodeType(diffLNodeType)?.dos).to.not.have.property("Pos2");
        expect(LNodeType(diffLNodeType)?.dos).to.not.have.property("Pos3");
        expect(LNodeType(orphanLNode)?.dos).to.not.have.property("Pos");
    });
    it("returns same description with semantically equal LNodeType's", () => {
        expect(JSON.stringify(LNodeType(baseLNodeType))).to.equal(JSON.stringify(LNodeType(equalLNodeType)));
    });
    it("returns different description with unequal LNodeType elements", () => expect(JSON.stringify(LNodeType(baseLNodeType))).to.not.equal(JSON.stringify(LNodeType(diffLNodeType))));
});
//# sourceMappingURL=LNodeType.spec.js.map