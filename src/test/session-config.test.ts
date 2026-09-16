import { describe, expect, it } from "vitest";
import { DEFAULT_SESSION_CONFIG } from "../data/exercises";
import {
  moveSessionExercise,
  setExerciseSessions,
  toggleSessionExercise,
} from "../utils/sessionConfig";

describe("session configuration", () => {
  it("adds and removes an exercise", () => {
    const added = toggleSessionExercise(DEFAULT_SESSION_CONFIG, "morning", "plancha-frontal");
    expect(added.morning).toContain("plancha-frontal");

    const removed = toggleSessionExercise(added, "morning", "plancha-frontal");
    expect(removed.morning).toEqual(DEFAULT_SESSION_CONFIG.morning);
  });

  it("updates both routine memberships together", () => {
    const result = setExerciseSessions(
      DEFAULT_SESSION_CONFIG,
      "plancha-frontal",
      new Set(["morning", "night"])
    );

    expect(result.morning).toContain("plancha-frontal");
    expect(result.night).toContain("plancha-frontal");
  });

  it("does not affect the other routine when toggling", () => {
    const result = toggleSessionExercise(DEFAULT_SESSION_CONFIG, "morning", "plancha-frontal");
    expect(result.night).toEqual(DEFAULT_SESSION_CONFIG.night);
  });

  it("moves exercises without mutating the original configuration", () => {
    const originalMorning = [...DEFAULT_SESSION_CONFIG.morning];
    const first = originalMorning[0];
    const second = originalMorning[1];
    const result = moveSessionExercise(DEFAULT_SESSION_CONFIG, "morning", first, 1);

    expect(result.morning[0]).toBe(second);
    expect(result.morning[1]).toBe(first);
    expect(DEFAULT_SESSION_CONFIG.morning).toEqual(originalMorning);
  });

  it("ignores moves outside routine boundaries", () => {
    const first = DEFAULT_SESSION_CONFIG.morning[0];
    const last = DEFAULT_SESSION_CONFIG.morning.at(-1)!;

    expect(moveSessionExercise(DEFAULT_SESSION_CONFIG, "morning", first, -1)).toBe(DEFAULT_SESSION_CONFIG);
    expect(moveSessionExercise(DEFAULT_SESSION_CONFIG, "morning", last, 1)).toBe(DEFAULT_SESSION_CONFIG);
  });
});
