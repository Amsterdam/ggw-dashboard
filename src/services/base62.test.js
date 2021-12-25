import { decodeString, base62DecodeAngle } from "./base62";

describe("base62", () => {
  it("can base62 decode strings", () => {
    expect(decodeString("FR")).toEqual(957);
  });
  
  it("can base62 decode strings with angle", () => {
    expect(base62DecodeAngle("FR", 1)).toEqual(95.7);
    expect(base62DecodeAngle("-FR", 1)).toEqual(264.3);
    expect(base62DecodeAngle("0", 1)).toEqual(0);
    expect(base62DecodeAngle("-0", 1)).toEqual(360);
  });
});
