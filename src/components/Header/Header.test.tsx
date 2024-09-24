/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import i18n from "../../config/i18next";

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component successfully", () => {
    render(<Header />);
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
  });

  it("check the default selected Language", async () => {
    render(<Header />);
    const selectedLanguage = screen.getByTestId("language-select")?.firstChild;
    expect(selectedLanguage).toHaveTextContent("English");
  });

  it("selects a language", async () => {
    render(<Header />);
    const selectedLanguage = screen.getByTestId("language-select")?.firstChild;
    fireEvent.keyDown(selectedLanguage!, { key: "ArrowDown" });
    const hindiOption = screen.getAllByRole("option")?.[1];
    fireEvent.click(hindiOption);
    await waitFor(() => {
      expect(i18n.language).toBe("hi");
      const selectedLanguage =
        screen.getByTestId("language-select")?.firstChild;
      expect(selectedLanguage).toHaveTextContent("English");
    });
  });
});
