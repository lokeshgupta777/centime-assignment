/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen } from "@testing-library/react";
import Centime from "./App";

jest.mock("./components/CashFlow/CashFlow", () => ({
  __esModule: true,
  default: () => <p>CashFlow</p>,
}));

jest.mock("./components/Header/Header", () => ({
  __esModule: true,
  default: () => <p>Header</p>,
}));

describe("App", () => {
  it("renders component successfully", async () => {
    render(<Centime />);
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("CashFlow")).toBeInTheDocument();
  });
});
