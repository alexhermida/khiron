import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import ExerciseGrid from "../components/ExerciseGrid";
import { renderWithProviders } from "./utils";
import type { Exercise } from "../data/exercises";

const mockExercises: Exercise[] = [
  {
    id: "ex-1",
    title: "Exercise One",
    description: "Desc 1",
    duration: "10 reps",
    benefit: "Benefit 1",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "ex-2",
    title: "Exercise Two",
    description: "Desc 2",
    duration: "20 reps",
    benefit: "Benefit 2",
    category: "physio",
    frequency: "daily",
  },
];

describe("ExerciseGrid", () => {
  it("renders empty message when exercises list is empty", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseGrid exercises={[]} onSelect={onSelect} emptyMessage="No exercises" />
    );

    expect(screen.getByText("No exercises")).toBeInTheDocument();
  });

  it("renders one ExerciseCard per exercise", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseGrid exercises={mockExercises} onSelect={onSelect} />
    );

    expect(screen.getByText("Exercise One")).toBeInTheDocument();
    expect(screen.getByText("Exercise Two")).toBeInTheDocument();
  });
});
