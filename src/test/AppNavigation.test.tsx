import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { DesktopNavigation, MobileNavigation } from "../components/AppNavigation";
import { renderWithProviders } from "./utils";

describe("app navigation", () => {
  it("prioritizes the three daily routines", () => {
    renderWithProviders(<DesktopNavigation />);

    expect(screen.getByRole("link", { name: /Mañana/i })).toHaveAttribute("href", "/morning");
    expect(screen.getByRole("link", { name: /Trabajo/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: /Noche/i })).toHaveAttribute("href", "/night");
  });

  it("keeps the exercise registry in mobile navigation", () => {
    renderWithProviders(<MobileNavigation />);

    expect(screen.getByRole("link", { name: "Ejercicios" })).toHaveAttribute("href", "/exercises");
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
  });
});
