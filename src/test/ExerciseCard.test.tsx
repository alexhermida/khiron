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

    expect(screen.getByRole("button", { name: /Ver vídeo/i })).toBeInTheDocument();
  });

  it("shows 'Ver detalle' button when driveFileId is absent", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithoutVideo} onSelect={onSelect} />
    );

    expect(screen.getByRole("button", { name: /Ver detalle/i })).toBeInTheDocument();
  });

  it("calls onSelect from the semantic detail button", () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithVideo} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ver vídeo/i }));
    expect(onSelect).toHaveBeenCalledWith(mockExerciseWithVideo);
  });

  it("shows routine assignment actions in registry mode", async () => {
    renderWithProviders(
      <ExerciseCard exercise={mockExerciseWithVideo} onSelect={vi.fn()} showSessionActions />
    );

    expect(await screen.findByRole("button", { name: /Gestionar rutinas/i })).toBeInTheDocument();
  });
});
