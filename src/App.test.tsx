import "./matchMedia.mock";
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/layout/Dashboard", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Dashboard</div>;
    },
  };
});

test("renders dashboard component", () => {
  render(
    <>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
      )
    </>,
  );
  const dashboardElement = screen.getByText(/dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
