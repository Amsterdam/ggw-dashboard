import axios from "axios";

import { readData, readPaginatedData, HTTPStatus } from "./datareader";
import { stadsdelen } from  "./datareader.fixtures";

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


  // it("should retry reading data", async () => {
  //   global.console.error = jest.fn();
  //   let data;
  //   try {
  //     data = await readData("retry");
  //   } catch (error) {
  //     expect(data).toEqual(undefined);
  //   }
  //   expect(axios.get).toBeCalledWith("retry");
  //   expect(axios.get).toHaveBeenCalledTimes(5);
  //   expect(global.console.error).toHaveBeenCalledTimes(6);

  //   expect(HTTPStatus.error).toEqual(1);
  //   expect(HTTPStatus.pending).toEqual(0);
  //   expect(HTTPStatus.success).toEqual(0);

  //   global.console.error.mockRestore();
  // });

  // it("should retry n times reading data", async () => {
  //   mockData.x = 3;
  //   let data;
  //   try {
  //     data = await readData("retry-n");
  //   } catch (error) {
  //     expect(data).toEqual(undefined); // should not occur
  //   }
  //   expect(axios.get).toBeCalledWith("retry-n");
  //   expect(axios.get).toHaveBeenCalledTimes(3);
  //   expect(data.results).toEqual([1, 2]);

  //   expect(HTTPStatus.error).toEqual(0);
  //   expect(HTTPStatus.pending).toEqual(0);
  //   expect(HTTPStatus.success).toEqual(1);
  // });
});
