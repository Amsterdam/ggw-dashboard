import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Pano from "./Pano";

describe("datareader", () => {
  it("should render correctly", async () => {
    render(
      withTheme(<Pano gwb={{ code: "A", naam: "Centrum" }} />)
    );

    expect(screen.getByTestId("pano")).toBeInTheDocument();
    expect(screen.getByAltText("Pano van Centrum")).toBeInTheDocument();
    expect(screen.getByTitle("Pano van Centrum")).toBeInTheDocument();
  });
});
