import axios from "axios";
import { getGeometriesGeoJson } from "./map";
import { stadsdelen, gebieden, wijken } from "./map.fixtures";

jest.mock("axios");

describe("map", () => {
  it("should return all gebied types of stadsdelen", async () => {
    axios.get.mockResolvedValueOnce({ data: stadsdelen });


    const result = await getGeometriesGeoJson("Stadsdeel");
    expect(result.features.length).toEqual(9);
  });

  it("should return all gebied types of gebieden", async () => {
    axios.get.mockResolvedValueOnce({ data: gebieden });

    const result = await getGeometriesGeoJson("Gebied");
    expect(result.features.length).toEqual(22);
  });

  it("should return all gebied types of wijken", async () => {
    axios.get.mockResolvedValueOnce({ data: wijken });

    const result = await getGeometriesGeoJson("Wijk");
    expect(result.features.length).toEqual(107);
  });

  // skipped buurten because too many data
});
