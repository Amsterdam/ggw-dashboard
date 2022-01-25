import { rdToWgs84, rdPolygonToWgs84, toPrecision } from "./geojson";

describe("geojson", () => {
  it("should round to 6 digits", () => {
    expect(toPrecision(1)).toEqual(1);
    expect(toPrecision(1.005, 2)).toEqual(1.01);
    expect(toPrecision(1.005, 3)).toEqual(1.005);
    expect(toPrecision(1.004, 2)).toEqual(1);
    expect(toPrecision(1.006, 2)).toEqual(1.01);
    expect(toPrecision(1.1234567, 6)).toEqual(1.123457);
  });

  it("should convert rd coordinates to wgs84 coordinates", () => {
    expect(rdToWgs84([52.35, 4.9])).toEqual([3.314256, 47.974823]);
  });

  it("should convert an rd polygon to wgs84 polygon", () => {
    const geometry = {
      type: "Polygon",
      coordinates: [
        [
          [52, 4],
          [52, 5],
          [53, 5],
          [53, 4],
        ],
      ],
    };

    expect(rdPolygonToWgs84(geometry)).toEqual({
      type: "Polygon",
      coordinates: [
        [
          [3.314251, 47.974815],
          [3.314251, 47.974824],
          [3.314264, 47.974824],
          [3.314265, 47.974815],
        ],
      ],
    });
  });

  it("should check the type of an rd polygon", () => {
    global.console.error = jest.fn();
    const geometry = {
      type: "Something",
      coordinates: [
        [
          [52, 4],
          [52, 5],
          [53, 5],
          [53, 4],
        ],
      ],
    };

    expect(rdPolygonToWgs84(geometry)).toEqual(undefined);
    expect(global.console.error).toHaveBeenCalled();
    global.console.error.mockRestore();
  });
});
