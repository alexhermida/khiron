import type { SessionConfig } from "../context/app-context";
import type { SessionKey } from "../data/exercises";

export function toggleSessionExercise(
  config: SessionConfig,
  session: SessionKey,
  exerciseId: string
): SessionConfig {
  const current = config[session];
  const updated = current.includes(exerciseId)
    ? current.filter((id) => id !== exerciseId)
    : [...current, exerciseId];
  return { ...config, [session]: updated };
}

export function moveSessionExercise(
  config: SessionConfig,
  session: SessionKey,
  exerciseId: string,
  direction: -1 | 1
): SessionConfig {
  const current = [...config[session]];
  const currentIndex = current.indexOf(exerciseId);
  const nextIndex = currentIndex + direction;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= current.length) return config;

  [current[currentIndex], current[nextIndex]] = [current[nextIndex], current[currentIndex]];
  return { ...config, [session]: current };
}

export function setExerciseSessions(
  config: SessionConfig,
  exerciseId: string,
  selectedSessions: Set<SessionKey>
): SessionConfig {
  return {
    morning: updateMembership(config.morning, exerciseId, selectedSessions.has("morning")),
    night: updateMembership(config.night, exerciseId, selectedSessions.has("night")),
  };
}

function updateMembership(ids: string[], exerciseId: string, shouldInclude: boolean) {
  const isIncluded = ids.includes(exerciseId);
  if (shouldInclude === isIncluded) return ids;
  return shouldInclude ? [...ids, exerciseId] : ids.filter((id) => id !== exerciseId);
}
