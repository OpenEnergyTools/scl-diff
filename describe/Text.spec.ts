import { expect } from "chai";

import { Text } from "./Text.js";

const textElement = new DOMParser()
  .parseFromString(
    `<SCL
      xmlns="http://www.iec.ch/61850/2003/SCL"
      xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates"
      xmlns:ens="http://somevalidURI"
    >
      <Text desc="someDesc" sxy:x="10" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        Some more detailed description than the desc field
      </Text>
    </SCL>`,
    "application/xml",
  )
  .querySelector("Text")!;

describe("Description for SCL element Text", () => {
  it("returns outerHTML", () =>
    expect(Text(textElement)).to
      .equal(`<Text xmlns="http://www.iec.ch/61850/2003/SCL" desc="someDesc" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" sxy:x="10" xmlns:ens="http://somevalidURI" ens:some="someOtherNameSpace">
        <![CDATA[some comment]]>
        Some more detailed description than the desc field
      </Text>`));
});
