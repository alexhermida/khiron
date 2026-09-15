import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import PhysioTab from "../components/PhysioTab";
import { renderWithProviders } from "./utils";
import { EXERCISES_TO_AVOID } from "../data/exercises";

describe("PhysioTab", () => {
  it("renders both Diarios and 3x per Semana section headings", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    expect(screen.getByText("Diarios")).toBeInTheDocument();
    expect(screen.getByText("3x por Semana (días no consecutivos)")).toBeInTheDocument();
  });

  it("renders Ejercicios a Evitar section", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    expect(screen.getByText("Ejercicios a Evitar")).toBeInTheDocument();
  });

  it("renders one chip per EXERCISES_TO_AVOID item", () => {
    const onSelect = vi.fn();
    renderWithProviders(<PhysioTab onSelect={onSelect} />);

    for (const item of EXERCISES_TO_AVOID) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
