import { describe, it, expect } from "vitest";
import { DEFAULT_SESSION_CONFIG, type SessionKey } from "../data/exercises";

type SessionConfig = Record<SessionKey, string[]>;

function toggleExercise(
  config: SessionConfig,
  session: SessionKey,
  id: string
): SessionConfig {
  const current = config[session];
  const updated = current.includes(id)
    ? current.filter((eid) => eid !== id)
    : [...current, id];
  return { ...config, [session]: updated };
}

function moveExercise(
  config: SessionConfig,
  session: SessionKey,
  id: string,
  direction: -1 | 1
): SessionConfig {
  const current = [...config[session]];
  const idx = current.indexOf(id);
  if (idx < 0) return config;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= current.length) return config;
  [current[idx], current[newIdx]] = [current[newIdx], current[idx]];
  return { ...config, [session]: current };
}

describe("session config toggle", () => {
  it("adds an exercise not yet in the session", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const result = toggleExercise(config, "morning", "plancha-frontal");
    expect(result.morning).toContain("plancha-frontal");
    expect(result.morning).toHaveLength(DEFAULT_SESSION_CONFIG.morning.length + 1);
  });

  it("removes an exercise already in the session", () => {
    const firstId = DEFAULT_SESSION_CONFIG.morning[0];
    const config = { ...DEFAULT_SESSION_CONFIG };
    const result = toggleExercise(config, "morning", firstId);
    expect(result.morning).not.toContain(firstId);
    expect(result.morning).toHaveLength(DEFAULT_SESSION_CONFIG.morning.length - 1);
  });

  it("does not affect the other session", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const result = toggleExercise(config, "morning", "plancha-frontal");
    expect(result.night).toEqual(DEFAULT_SESSION_CONFIG.night);
  });

  it("toggle twice returns to original", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const after1 = toggleExercise(config, "morning", "plancha-frontal");
    const after2 = toggleExercise(after1, "morning", "plancha-frontal");
    expect(after2.morning).toEqual(config.morning);
  });

  it("multiple toggles on different exercises accumulate correctly", () => {
    let config: SessionConfig = { ...DEFAULT_SESSION_CONFIG };
    config = toggleExercise(config, "morning", "plancha-frontal");
    config = toggleExercise(config, "morning", "press-pallof");
    config = toggleExercise(config, "morning", "slr");
    expect(config.morning).toContain("plancha-frontal");
    expect(config.morning).toContain("press-pallof");
    expect(config.morning).toContain("slr");
    expect(config.morning).toHaveLength(DEFAULT_SESSION_CONFIG.morning.length + 3);
  });
});

describe("session config reorder", () => {
  it("moves an exercise down", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const first = config.morning[0];
    const second = config.morning[1];
    const result = moveExercise(config, "morning", first, 1);
    expect(result.morning[0]).toBe(second);
    expect(result.morning[1]).toBe(first);
  });

  it("moves an exercise up", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const first = config.morning[0];
    const second = config.morning[1];
    const result = moveExercise(config, "morning", second, -1);
    expect(result.morning[0]).toBe(second);
    expect(result.morning[1]).toBe(first);
  });

  it("does not move first exercise up", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const result = moveExercise(config, "morning", config.morning[0], -1);
    expect(result.morning).toEqual(config.morning);
  });

  it("does not move last exercise down", () => {
    const config = { ...DEFAULT_SESSION_CONFIG };
    const lastId = config.morning[config.morning.length - 1];
    const result = moveExercise(config, "morning", lastId, 1);
    expect(result.morning).toEqual(config.morning);
  });

  it("does not mutate original config", () => {
    const config = { ...DEFAULT_SESSION_CONFIG, morning: [...DEFAULT_SESSION_CONFIG.morning] };
    const original = [...config.morning];
    moveExercise(config, "morning", config.morning[0], 1);
    expect(config.morning).toEqual(original);
  });
});
