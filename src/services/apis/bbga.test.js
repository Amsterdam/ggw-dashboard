import axios from "axios";

import { getAllMeta, getMeta, getStd, getOneStd, getAllCijfers } from "../../../src/services/apis/bbga";
import { metaMock, stdMock, kerncijfersMock } from "./bbga.fixtures";

jest.mock("axios");

describe("bbga", () => {
  it("should retrieve all available meta information", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: metaMock }));

    const meta = await getAllMeta();
    expect(Object.keys(meta).length).toEqual(4);
  });

  it("should return meta information given a variable name", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: metaMock }));

    const meta = await getMeta("BEV0_17_P");
    expect(meta.label).toEqual("0-17 jaar (%)");
  });

  it("should retrieve all std information", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stdMock }));

    const std = await getStd();
    expect(std.length).toEqual(11);
  });

  it("should return std information given a variable name", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: metaMock }));

    const std = await getOneStd("BEV0_17_P");
    expect(std.length).toEqual(10);
  });

  it("should retrieve cijfers information", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: kerncijfersMock }));

    const cijfers = await getAllCijfers("BEV66PLUS_P", 2018);
    expect(cijfers.length).toEqual(17);
  });
});
