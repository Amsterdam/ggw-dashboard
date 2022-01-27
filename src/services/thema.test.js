import { THEMAS, URL_THEMA_MAPPING } from "./thema";

describe("thema", () => {
  it("should export all themas", () => {
    expect(Object.keys(THEMAS).length).toEqual(15);
  });

  it("should export all url mappings", () => {
    expect(Object.keys(URL_THEMA_MAPPING).length).toEqual(15);
  });

  it("should export gebied-in-kort as first url mapping", () => {
    expect(URL_THEMA_MAPPING["in-het-kort"]).toEqual(Object.keys(THEMAS)[0]);
  });
});
