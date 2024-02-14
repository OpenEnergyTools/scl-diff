import { expect } from "chai";

import { Server } from "./Server.js";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <AccessPoint name="AP1">
            <Server timeout="30">
              <Authentication />
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
              </LDevice>
              <LDevice inst="lDevice2">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
              </LDevice>
              <Association iedName="IED3" ldInst="lDevice2" lnClass="LLN0" lnInst="" kind="pre-established" associationId="someId" />
              <Association iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="1" kind="predefined" associationId="someId" />
              <Association desc="" iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="2" kind="predefined" associationId="someId" />
              <Association desc="" iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="2" kind="predefined" associationId="someId" />
            </Server>
        </AccessPoint>
      </IED>
      <IED name="IED2">
        <AccessPoint name="AP1">
            <Server>
              <Authentication none="true" password="false" weak="false" strong="false" certificate="false" />
              <LDevice inst="lDevice2">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
              </LDevice>
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN0" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
                <LN lnClass="MMXU" inst="1" lnType="MMXU" />
              </LDevice>
              <Association iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="1" />
              <Association desc="" iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="1" kind="predefined" associationId="someId" />
              <Association iedName="IED3" ldInst="lDevice2" lnClass="LLN0" lnInst="" kind="pre-established" associationId="someId" />
              <Association desc="" iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="2" kind="predefined" associationId="someId" />
              <Association desc="" iedName="IED3" ldInst="lDevice2" lnClass="MMXU" lnInst="2" kind="predefined" associationId="someId" />
            </Server>
        </AccessPoint>
      </IED>
      <IED name="IED3">
        <AccessPoint name="AP1">
            <Server timeout="13">
              <Authentication none="false" password="true" weak="true" strong="true" certificate="true" />
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN02" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
      <IED name="IED4">
        <AccessPoint name="AP1">
            <Server timeout="13">
              <LDevice inst="lDevice1">
                <LN0 lnClass="LLN0" inst="" lnType="LLN02" />
                <LN lnClass="MMXU" inst="2" lnType="MMXU" />
              </LDevice>
            </Server>
        </AccessPoint>
      </IED>
      <DataTypeTemplates>
        <LNodeType id="LLN0" desc="desc" lnClass="LLN0">     
          <DO name="Beh" type="BehENS"/>
        </LNodeType>
        <LNodeType id="MMXU" desc="desc" lnClass="MMXU">     
          <DO name="A" type="WYE"/>
        </LNodeType>
        <DOType cdc="ENS" id="BehENS" >
          <DA name="stVal" bType="Enum" type="BehModKind" fc="ST" >
            <Val>off</Val>
          </DA>
        </DOType>
        <DOType id="WYE" cdc="WYE">
          <SDO name="phsA" type="CMV" />
        </DOType>
        <DOType id="CMV" cdc="CMV" >
          <DA name="cVal" bType="Struct" fc="MX" type="Vector"/>
        </DOType>
        <DAType id="Vector" >
          <BDA name="mag" bType="Struct" type="AnalogueValue" />
        </DAType>
        <DAType id="AnalogueValue" >
          <BDA name="f" bType="FLOAT32" >
              <Val sGroup="3">60.60</Val>
              <Val sGroup="1">10.10</Val>
              <Val sGroup="2">40.10</Val>
          </BDA>
        </DAType>
        <EnumType id="BehModKind" >
          <EnumVal ord="1">on</EnumVal>
          <EnumVal ord="3">test</EnumVal>
          <EnumVal ord="5">off</EnumVal>
        </EnumType>
      </DataTypeTemplates>
    </SCL>`,
  "application/xml",
);

const baseServer = scl.querySelector('IED[name="IED1"] Server')!;
const equalServer = scl.querySelector('IED[name="IED2"] Server')!;
const diffServer = scl.querySelector('IED[name="IED3"] Server')!;
const invalidServer = scl.querySelector('IED[name="IED4"] Server')!;

describe("Description for SCL schema type LDevice", () => {
  it("returns undefined with missing lnType attribute", () =>
    expect(Server(invalidServer)).to.be.undefined);

  it("default timeout attribute if present", () =>
    expect(Server(equalServer)?.timeout).to.equal(30));

  it("default timeout attribute if present", () =>
    expect(Server(diffServer)?.timeout).to.equal(13));

  it("returns same description with semantically equal LDevice's", () =>
    expect(JSON.stringify(Server(baseServer))).to.equal(
      JSON.stringify(Server(equalServer)),
    ));

  it("returns different description with unequal LDevice elements", () =>
    expect(JSON.stringify(Server(baseServer))).to.not.equal(
      JSON.stringify(Server(diffServer)),
    ));
});
