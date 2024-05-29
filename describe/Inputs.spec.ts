import { expect } from "chai";

import { describeInputs } from "./Inputs.js";

const scl = new DOMParser().parseFromString(
  `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
    >
      <LN0 lnClass="LLN0" inst="" >
        <Inputs>
            <ExtRef iedName="ied1" ldInst="ldInst" lnClass="LLN0" doName="Beh" daName="stVal" serviceType="GOOSE" srcLDInst="ldInst" srcLNClass="LLN0" srcCBName="cbName" pLN="LLN0" pDO="Beh" pDA="stVal" pServT="GOOSE" />
            <ExtRef iedName="ied1" ldInst="ldInst" lnClass="LLN0" doName="Beh" daName="q" serviceType="GOOSE" srcLDInst="ldInst" srcLNClass="LLN0" srcCBName="cbName" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="q" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
        </Inputs>
      </LN0>
      <LN prefix="A" lnClass="MMXU" inst="1" >
        <Inputs>
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" serviceType="GOOSE" srcLDInst="ldInst" srcLNClass="LLN0" srcCBName="cbName" pLN="LLN0" pDO="Beh" pDA="stVal" pServT="GOOSE" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef iedName="ied1" ldInst="ldInst" lnClass="LLN0" doName="Beh" daName="q" serviceType="GOOSE" srcLDInst="ldInst" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="cbName" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="q" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
        </Inputs>
      </LN>
      <LN prefix="B" lnClass="MMXU" inst="2" >
        <Inputs>
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="stVal" serviceType="GOOSE" srcLDInst="ldInst" srcLNClass="LLN0" srcCBName="cbName" pLN="LLN0" pDO="Beh" pDA="stVal" pServT="GOOSE" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsB" daName="cVal.mag.f" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef iedName="ied1" ldInst="ldInst" lnClass="LLN0" doName="Beh" daName="q" serviceType="GOOSE" srcLDInst="ldInst" srcPrefix="" srcLNClass="LLN0" srcLNInst="" srcCBName="cbName" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
            <ExtRef iedName="ied1" ldInst="ldInst" prefix="A" lnClass="MMXU" lnInst="1" doName="A.phsB" daName="q" serviceType="Report" srcLDInst="ldInst" srcPrefix="A" srcLNClass="MMXU" srcLNInst="1" srcCBName="cbName" />
            <ExtRef intAddr="Beh.t" pLN="LLN0" pDO="Beh" pDA="t" pServT="GOOSE" />
        </Inputs>
      </LN>
    </SCL>`,
  "application/xml",
);

const baseInputs = scl.querySelector("LN0 > Inputs")!;
const equalInputs = scl.querySelector('LN[lnClass="MMXU"][inst="1"] > Inputs')!;
const diffInputs = scl.querySelector('LN[lnClass="MMXU"][inst="2"] > Inputs')!;

describe("Description for SCL schema element Inputs", () => {
  it("returns same description with semantically equal Inputs", () =>
    expect(JSON.stringify(describeInputs(baseInputs))).to.equal(
      JSON.stringify(describeInputs(equalInputs)),
    ));

  it("returns same description with semantically different Inputs", () =>
    expect(JSON.stringify(describeInputs(baseInputs))).to.not.equal(
      JSON.stringify(describeInputs(diffInputs)),
    ));
});
