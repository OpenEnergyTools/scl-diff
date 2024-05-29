import { expect } from "chai";

import { IED } from "./IED";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <Services />
        <AccessPoint name="AP1" router="false" clock="false" kdc="false">
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
            </Server>
        </AccessPoint>
        <KDC iedName="IED2" apName="AP1" />
        <KDC iedName="IED4" apName="AP1" />
        <KDC iedName="IED3" apName="AP1" />
        <KDC iedName="IED2" apName="AP1" />
      </IED>
      <IED name="IED2" originalSclVersion="2003" originalSclRevision="A" originalSclRelease="1" engRight="full">
        <Services />
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
            </Server>
        </AccessPoint>
        <KDC iedName="IED3" apName="AP1" />
        <KDC iedName="IED4" apName="AP1" />
        <KDC apName="AP1" />
        <KDC iedName="IED5" />
        <KDC iedName="IED2" apName="AP1" />
        <KDC iedName="IED2" apName="AP1" />
      </IED>
      <IED name="IED3" originalSclVersion="2007" originalSclRevision="B" originalSclRelease="4" engRight="fix" type="type" manufacturer="manufacturer" configVersion="3" owner="owner" >
        <AccessPoint name="AP1" router="true" clock="true" kdc="true">
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
      <IED name="IED5">
        <AccessPoint >
          <LN lnClass="MMXU" inst="1" lnType="invalidType" />
        </AccessPoint>
      </IED>
      <IED name="IED6">
        <AccessPoint name="AP1">
          <ServerAt />
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

const baseIED = scl.querySelector('IED[name="IED1"]')!;
const equalIED = scl.querySelector('IED[name="IED2"]')!;
const diffIED = scl.querySelector('IED[name="IED3"]')!;
const invalidIED1 = scl.querySelector('IED[name="IED4"]')!;
const invalidIED2 = scl.querySelector('IED[name="IED5"]')!;

describe("Description for SCL schema type IED", () => {
  it("returns undefined with invalid AccessPoint", () => {
    expect(IED(invalidIED1)).to.be.undefined;
    expect(IED(invalidIED2)).to.be.undefined;
  });

  it("return originalSclVersion attribute defaulting to 2003", () =>
    expect(IED(baseIED)?.originalSclVersion).to.be.equal(2003));

  it("return originalSclRevision attribute defaulting to 'A'", () =>
    expect(IED(baseIED)?.originalSclRevision).to.be.equal("A"));

  it("return originalSclRelease attribute defaulting to 1", () =>
    expect(IED(baseIED)?.originalSclRelease).to.be.equal(1));

  it("return type attribute ", () =>
    expect(IED(diffIED)?.type).to.be.equal("type"));

  it("return manufacturer attribute ", () =>
    expect(IED(diffIED)?.manufacturer).to.be.equal("manufacturer"));

  it("return configVersion attribute ", () =>
    expect(IED(diffIED)?.configVersion).to.be.equal("3"));

  it("return owner attribute ", () =>
    expect(IED(diffIED)?.owner).to.be.equal("owner"));

  it("returns same description with semantically equal IED's", () =>
    expect(JSON.stringify(IED(baseIED))).to.equal(
      JSON.stringify(IED(equalIED)),
    ));

  it("returns different description with unequal IED elements", () =>
    expect(JSON.stringify(IED(baseIED))).to.not.equal(
      JSON.stringify(IED(diffIED)),
    ));
});
