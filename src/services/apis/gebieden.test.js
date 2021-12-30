import axios from "axios";
import { stadsdelen, gebieden, wijken } from "./map.fixtures";
import { GEBIED_TYPE, getGebiedType, enhanceGWB, getAllStadsdelen } from "./gebieden";

jest.mock("axios");

describe("Gebieden API", () => {
  it("should get the gebied type for a given gebiedcode", () => {
    expect(getGebiedType("")).toEqual("?");

    expect(getGebiedType("A")).toEqual(GEBIED_TYPE.Stadsdeel);
    expect(getGebiedType("a")).toEqual("?a");
    expect(getGebiedType("A1")).toEqual("?A1");

    expect(getGebiedType("DX01")).toEqual(GEBIED_TYPE.Gebied);
    expect(getGebiedType("DX011")).toEqual("?DX011");
    expect(getGebiedType("DXA1")).toEqual("?DXA1");

    expect(getGebiedType("D01")).toEqual(GEBIED_TYPE.Wijk);
    expect(getGebiedType("D011")).toEqual("?D011");
    expect(getGebiedType("DA1")).toEqual("?DA1");

    expect(getGebiedType("D01a")).toEqual(GEBIED_TYPE.Buurt);
    expect(getGebiedType("d01a")).toEqual("?d01a");
    expect(getGebiedType("D01A")).toEqual("?D01A");
    expect(getGebiedType("DA1a")).toEqual("?DA1a");

    expect(getGebiedType("STAD")).toEqual(GEBIED_TYPE.Stad);
    expect(getGebiedType("Stad")).toEqual("?Stad");
    expect(getGebiedType("stad")).toEqual("?stad");
    expect(getGebiedType("STAD1")).toEqual("?STAD1");
  });

  it("should compensate for API inconsistencies and missing properties", () => {
    expect(
      enhanceGWB({
        code: "A",
        naam: "Centrum",
      }),
    ).toEqual({
      code: "A",
      display: "A Centrum",
      gebiedType: "Stadsdeel",
      naam: "Centrum",
      vollcode: "A",
      volledige_code: "A",
    });
  });

  it("should fetch all stadsdelen", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelen }));

    const gebieden = await getAllStadsdelen();
    console.log("-", gebieden);
  });
});
