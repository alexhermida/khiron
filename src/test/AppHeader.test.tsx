import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import AppHeader from "../components/AppHeader";
import { renderWithProviders } from "./utils";

describe("AppHeader", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the Khiron heading", () => {
    renderWithProviders(<AppHeader />);
    expect(screen.getByText("Khiron")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithProviders(<AppHeader />);
    expect(screen.getByText("Movilidad Personalizada")).toBeInTheDocument();
  });

  it("has a theme toggle button", () => {
    renderWithProviders(<AppHeader />);
    expect(screen.getByRole("button", { name: /tema/i })).toBeInTheDocument();
  });

  it("clicking theme toggle flips data-theme on document element", () => {
    renderWithProviders(<AppHeader />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    const themeButton = screen.getByRole("button", { name: /tema/i });
    fireEvent.click(themeButton);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
