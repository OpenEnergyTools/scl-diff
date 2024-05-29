import { expect } from "chai";

import { Private } from "./Private.js";

const privateElement = new DOMParser()
  .parseFromString(
    `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <Private type="someType" desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        <IED name="somePrivateIED"/>
      </Private>
    </SCL>`,
    "application/xml",
  )
  .querySelector("Private")!;

describe("Description for SCL element Private", () => {
  it("returns outerHTML", () =>
    expect(Private(privateElement)).to
      .equal(`<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="someType" desc="someDesc" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" sxy:x="10" xmlns:ens="http://somevalidURI" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        <IED name="somePrivateIED"/>
      </Private>`));
});
