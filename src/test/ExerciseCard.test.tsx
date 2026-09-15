import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import ExerciseCard from "../components/ExerciseCard";
import { renderWithProviders } from "./utils";
import type { Exercise } from "../data/exercises";

const mockExerciseWithVideo: Exercise = {
  id: "test-1",
  title: "Test Exercise",
  description: "Test description",
  duration: "10 reps",
  benefit: "Test benefit",
  category: "mobility",
  frequency: "daily",
  driveFileId: "mock-file-id",
};

const mockExerciseWithoutVideo: Exercise = {
  id: "test-2",
  title: "No Video Exercise",
  description: "Test description",
  duration: "30s/lado",
  benefit: "Test benefit",
  category: "physio",
  frequency: "daily",
};

describe("ExerciseCard", () => {
  it("renders title, duration chip, and avatar", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithVideo} onSelect={onSelect} />
    );

    expect(screen.getByText("Test Exercise")).toBeInTheDocument();
    expect(screen.getByText("10 reps")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("shows 'Ver video' button when driveFileId is present", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithVideo} onSelect={onSelect} />
    );

    expect(screen.getByRole("button", { name: /Ver video/i })).toBeInTheDocument();
  });

  it("shows 'Ver detalle' button when driveFileId is absent", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithoutVideo} onSelect={onSelect} />
    );

    expect(screen.getByRole("button", { name: /Ver detalle/i })).toBeInTheDocument();
  });

  it("calls onSelect when title area is clicked", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithVideo} onSelect={onSelect} />
    );

    const clickableArea = screen.getByText("Test Exercise").parentElement!;
    fireEvent.click(clickableArea);
    expect(onSelect).toHaveBeenCalledWith(mockExerciseWithVideo);
  });
});
