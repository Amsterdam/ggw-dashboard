import axios from "axios";

import { readData, readPaginatedData, HTTPStatus } from "./datareader";
import { stadsdelen } from "./datareader.fixtures";

jest.mock("axios");

beforeEach(() => {
  HTTPStatus.pending = 0;
  HTTPStatus.error = 0;
  HTTPStatus.success = 0;
});

describe("datareader", async () => {
  it("should read paginated data given an url", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelen }));

    const data = await readPaginatedData("url", {}, "_embedded.stadsdelen");
    expect(data.length).toEqual(9);

    expect(HTTPStatus.pending).toEqual(0);
    expect(HTTPStatus.error).toEqual(0);
    expect(HTTPStatus.success).toEqual(1);
  });

  it("should read data given an url", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stadsdelen }));

    const data = await readData("url");
    expect(data._embedded.stadsdelen.length).toEqual(9);
    
    expect(HTTPStatus.pending).toEqual(0);
    expect(HTTPStatus.error).toEqual(0);
    expect(HTTPStatus.success).toEqual(1);
  });
});
