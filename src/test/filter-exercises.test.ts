import { describe, expect, it } from "vitest";
import { exercises } from "../data/exercises";
import { filterExercises } from "../utils/filterExercises";

describe("exercise registry filters", () => {
  it("matches search terms without requiring accents", () => {
    const result = filterExercises(exercises, "basculacion", "all");
    expect(result.map((exercise) => exercise.id)).toContain("basculacion-pelvica");
  });

  it("searches benefits as well as titles", () => {
    const result = filterExercises(exercises, "descompresion", "all");
    expect(result.map((exercise) => exercise.id)).toContain("elongacion-axial");
  });

  it("filters by category", () => {
    const result = filterExercises(exercises, "", "work");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((exercise) => exercise.category === "work")).toBe(true);
  });
});
