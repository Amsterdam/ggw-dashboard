import axios from "axios";

import { getAllMeta, getMeta } from "../../../src/services/apis/bbga";
import { metaMock } from "./bbga.fixtures";

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
});
