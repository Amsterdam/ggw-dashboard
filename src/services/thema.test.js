import { THEMAS, URL_THEMA_MAPPING } from "./thema";

describe("thema", () => {
  it("should export all themas", () => {
    expect(THEMAS.length).toEqual(15);
  });

  it("should export all url mappings", () => {
    expect(Object.keys( URL_THEMA_MAPPING).length).toEqual(15);
    expect(URL_THEMA_MAPPING['in-het-kort']).toEqual(THEMAS[0]);
  });
});
