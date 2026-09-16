import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import PhysioTab from "../components/PhysioTab";
import { renderWithProviders } from "./utils";
import { EXERCISES_TO_AVOID } from "../data/exercises";

describe("PhysioTab", () => {
  it("renders daily and weekly section headings", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    expect(screen.getByRole("heading", { name: "Cada día" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3 veces por semana" })).toBeInTheDocument();
  });

  it("renders Ejercicios a Evitar section", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    expect(screen.getByText("Ejercicios que debes evitar")).toBeInTheDocument();
  });

  it("renders one chip per EXERCISES_TO_AVOID item", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    for (const item of EXERCISES_TO_AVOID) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
