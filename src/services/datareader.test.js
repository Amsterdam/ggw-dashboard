import axios from "axios";

import { readData, readPaginatedData } from "./datareader";
import { stadsdelen } from "./datareader.fixtures";

jest.mock("axios");

describe("datareader", async () => {
  it("should read paginated data given an url", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelen }));

    const data = await readPaginatedData("url", {}, "_embedded.stadsdelen");
    expect(data.length).toEqual(9);
  });

  it("should read data given an url", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelen }));

    const data = await readData("url");
    expect(data._embedded.stadsdelen.length).toEqual(9);
  });
});
