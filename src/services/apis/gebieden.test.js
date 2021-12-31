import axios from "axios";
import {
  stadsdelen as stadsdelenMock,
  gebieden as gebiedenMock,
  wijken as wijkenMock,
  buurten as buurtenMock,
} from "./gebieden.fixtures";
import {
  GEBIED_TYPE,
  getGebiedType,
  enhanceGWB,
  getAllStadsdelen,
  getAllGebieden,
  getAllWijken,
  getAllBuurten,
  getAll,
  getGebied,
} from "./gebieden";

jest.mock("axios");

describe("gebieden", () => {
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
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelenMock }));
    const stadsdelen = await getAllStadsdelen();

    expect(stadsdelen.length).toEqual(9);
  });

  it("should fetch all gebieden", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: gebiedenMock }));
    const gebieden = await getAllGebieden();

    expect(gebieden.length).toEqual(22);
  });

  it("should fetch all wijken", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: wijkenMock }));
    const wijken = await getAllWijken();

    expect(wijken.length).toEqual(20);
  });

  it("should fetch all buurten", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: buurtenMock }));
    const buurten = await getAllBuurten();

    expect(buurten.length).toEqual(4);
  });

  it("should fetch all", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: gebiedenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: wijkenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: buurtenMock }));

    const all = await getAll();

    expect(all.length).toEqual(55);
  });

  it("should fetch 1 gebied", () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: gebiedenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: wijkenMock }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: buurtenMock }));

    expect(getGebied("A").naam).toEqual("Centrum");
    expect(getGebied("DX01").naam).toEqual("Centrum-West");
    expect(getGebied("B10").naam).toEqual("Westelijk Havengebied");
    expect(getGebied("SAF1").naam).toEqual("Aetsveldsepolder");
  });
});
