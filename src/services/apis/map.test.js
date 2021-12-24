import axios from "axios";
import { getGeometriesGeoJson } from "./map";
import { gebieden } from "./map.fixtures";

jest.mock("axios");
console.log("gebieden", gebieden);

describe("map", () => {
  it("should return all gebied types of gebieden", async () => {
    axios.get.mockResolvedValue(gebieden);

    const result = await getGeometriesGeoJson("Gebied");
    expect(result.features.length).toEqual(22);
  });
});
