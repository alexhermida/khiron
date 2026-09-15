import { describe, it, expect } from "vitest";
import {
  exercises,
  getExerciseById,
  DEFAULT_SESSION_CONFIG,
  WORK_EXERCISE_IDS,
  EXERCISES_TO_AVOID,
} from "../data/exercises";

describe("exercises data", () => {
  it("has 27 total exercises", () => {
    expect(exercises).toHaveLength(27);
  });

  it("has unique IDs", () => {
    const ids = exercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all default morning exercises exist", () => {
    for (const id of DEFAULT_SESSION_CONFIG.morning) {
      expect(getExerciseById(id)).toBeDefined();
    }
  });

  it("all default night exercises exist", () => {
    for (const id of DEFAULT_SESSION_CONFIG.night) {
      expect(getExerciseById(id)).toBeDefined();
    }
  });

  it("all work exercise IDs exist", () => {
    for (const id of WORK_EXERCISE_IDS) {
      expect(getExerciseById(id)).toBeDefined();
    }
  });

  it("9 physio exercises have Drive video IDs", () => {
    const withDrive = exercises.filter((e) => e.driveFileId);
    expect(withDrive).toHaveLength(9);
    for (const ex of withDrive) {
      expect(ex.driveFileId).toBeTruthy();
    }
  });

  it("foam isometric exercise has a Drive image ID", () => {
    const withImage = exercises.filter((e) => e.driveImageId);
    expect(withImage).toHaveLength(1);
    expect(withImage[0].id).toBe("puente-gluteo-1pierna-foam");
  });

  it("has 4 exercises to avoid", () => {
    expect(EXERCISES_TO_AVOID).toHaveLength(4);
  });

  it("work exercises are all work-only frequency", () => {
    const workExercises = exercises.filter((e) => e.category === "work");
    for (const ex of workExercises) {
      expect(ex.frequency).toBe("work-only");
    }
  });
});
