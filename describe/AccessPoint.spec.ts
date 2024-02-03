import { expect } from "chai";
import { AccessPoint } from "./AccessPoint";

const scl = new DOMParser().parseFromString(
  `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" >
      <IED name="IED1">
        <AccessPoint name="AP1" router="false" clock="false" kdc="false">
            <Services />
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
            <ServerAt apName="AP1" />
            <GOOSESecurity name="goose1" serialNumber="1" xferNumber="somexfer1" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity name="goose3" serialNumber="3" xferNumber="somexfer3" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity name="goose2" serialNumber="2" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <SMVSecurity name="smv1" serialNumber="1" xferNumber="somexfer1" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="smv3" serialNumber="3" xferNumber="somexfer3" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="smv2" serialNumber="2" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="smv13" serialNumber="13" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="14" serialNumber="14" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" />
            </SMVSecurity>
        </AccessPoint>
      </IED>
      <IED name="IED2">
        <AccessPoint name="AP1">
            <Services />
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
            <ServerAt apName="AP1" />
            <GOOSESecurity name="goose3" serialNumber="3" xferNumber="somexfer3" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity name="goose1" serialNumber="1" xferNumber="somexfer1" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity name="goose2" serialNumber="2" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity serialNumber="13" xferNumber="somexfer2" >
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <GOOSESecurity serialNumber="14" xferNumber="somexfer2" >
              <Subject idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </GOOSESecurity>
            <SMVSecurity name="smv3" serialNumber="3" xferNumber="somexfer3" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="smv1" serialNumber="1" xferNumber="somexfer1" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
            <SMVSecurity name="smv2" serialNumber="2" xferNumber="somexfer2" >
              <Subject commonName="none" idHierarchy="someId" />
              <IssuerName commonName="none" idHierarchy="someId" />
            </SMVSecurity>
        </AccessPoint>
      </IED>
      <IED name="IED3">
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
        <AccessPoint name="AP1">
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

const baseAP = scl.querySelector('IED[name="IED1"]>AccessPoint')!;
const equalAP = scl.querySelector('IED[name="IED2"]>AccessPoint')!;
const diffAP = scl.querySelector('IED[name="IED3"]>AccessPoint')!;
const invalidAP1 = scl.querySelector('IED[name="IED4"]>AccessPoint')!;
const invalidAP2 = scl.querySelector('IED[name="IED5"]>AccessPoint')!;
const invalidAP3 = scl.querySelector('IED[name="IED6"]>AccessPoint')!;

describe("Description for SCL schema type AccessPoint", () => {
  it("returns undefined with invalid Server", () =>
    expect(AccessPoint(invalidAP1)).to.be.undefined);

  it("return undefined with invalid LN", () =>
    expect(AccessPoint(invalidAP2)).to.be.undefined);

  it("return undefined with invalid ServerAt", () =>
    expect(AccessPoint(invalidAP3)).to.be.undefined);

  it("return router attribute defaulting to false", () =>
    expect(AccessPoint(baseAP)?.router).to.be.false);

  it("return clock attribute defaulting to false", () =>
    expect(AccessPoint(baseAP)?.clock).to.be.false);

  it("return kdc attribute defaulting to false", () =>
    expect(AccessPoint(baseAP)?.kdc).to.be.false);

  it("returns same description with semantically equal LDevice's", () =>
    expect(JSON.stringify(AccessPoint(baseAP))).to.equal(
      JSON.stringify(AccessPoint(equalAP)),
    ));

  it("returns different description with unequal LDevice elements", () =>
    expect(JSON.stringify(AccessPoint(baseAP))).to.not.equal(
      JSON.stringify(AccessPoint(diffAP)),
    ));
});
