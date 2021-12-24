import axios from "axios";
import { getGeometriesGeoJson } from "./map";
import { gebieden } from "./map.fixtures";

jest.mock("axios");

describe("map", () => {
  it("should return all gebied types of gebieden", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: gebieden }));

    const result = await getGeometriesGeoJson("Gebied");
    expect(result.features.length).toEqual(22);
  });
});
