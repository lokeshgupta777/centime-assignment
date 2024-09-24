/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import i18n from "../../config/i18next";

jest.mock("../../config/i18next", () => ({
  changeLanguage: jest.fn(),
  language: "en",
}));

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

  it("language selection error", async () => {
    (i18n.changeLanguage as jest.Mock).mockRejectedValueOnce(
      "Language Change Error"
    );

    render(<Header />);
    const selectedLanguage = screen.getByTestId("language-select")?.firstChild;
    fireEvent.keyDown(selectedLanguage!, { key: "ArrowDown" });
    const hindiOption = screen.getAllByRole("option")?.[1];
    fireEvent.click(hindiOption);
    await new Promise((res) => setTimeout(res, 500));
    expect(i18n.language).toBe("en");
  });

  it("selects a language", async () => {
    (i18n.changeLanguage as jest.Mock).mockImplementationOnce(
      (newLanguage) =>
        new Promise((res) => {
          setTimeout(() => {
            i18n.language = newLanguage;
            res("Language Changed");
          }, 500);
        })
    );

    render(<Header />);
    const selectedLanguage = screen.getByTestId("language-select")?.firstChild;
    fireEvent.keyDown(selectedLanguage!, { key: "ArrowDown" });
    const hindiOption = screen.getAllByRole("option")?.[1];
    fireEvent.click(hindiOption);
    await waitFor(() => {
      expect(i18n.language).toBe("hi");
      const selectedLanguage =
        screen.getByTestId("language-select")?.firstChild;
      expect(selectedLanguage).toHaveTextContent("Hindi");
    });
  });
});
