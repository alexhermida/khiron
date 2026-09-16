import { useCallback, useEffect, useState } from "react";

export const WORK_DURATION_MS = 50 * 60 * 1000;
const STORAGE_KEY = "khiron_work_timer_v1";

interface PersistedTimer {
  endAt: number | null;
  remainingMs: number;
}

function readTimer(durationMs: number): PersistedTimer {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as PersistedTimer | null;
    if (!parsed || typeof parsed.remainingMs !== "number") {
      return { endAt: null, remainingMs: durationMs };
    }
    if (parsed.endAt && parsed.endAt <= Date.now()) {
      return { endAt: null, remainingMs: durationMs };
    }
    return {
      endAt: typeof parsed.endAt === "number" ? parsed.endAt : null,
      remainingMs: Math.min(Math.max(parsed.remainingMs, 0), durationMs),
    };
  } catch {
    return { endAt: null, remainingMs: durationMs };
  }
}

function persistTimer(timer: PersistedTimer) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
}

export function useTimer(onComplete: () => void, durationMs = WORK_DURATION_MS) {
  const [timer, setTimer] = useState<PersistedTimer>(() => readTimer(durationMs));
  const [now, setNow] = useState(() => Date.now());
  const isRunning = timer.endAt !== null;
  const remainingMs = timer.endAt
    ? Math.max(0, timer.endAt - now)
    : timer.remainingMs;

  useEffect(() => {
    if (!timer.endAt) return;
    const endAt = timer.endAt;
    const interval = window.setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= endAt) {
        const completed = { endAt: null, remainingMs: durationMs };
        window.clearInterval(interval);
        persistTimer(completed);
        setTimer(completed);
        setNow(currentTime);
        onComplete();
        return;
      }
      setNow(currentTime);
    }, 250);

    return () => window.clearInterval(interval);
  }, [durationMs, onComplete, timer.endAt]);

  const start = useCallback(() => {
    setTimer((current) => {
      if (current.endAt) return current;
      const next = { endAt: Date.now() + current.remainingMs, remainingMs: current.remainingMs };
      persistTimer(next);
      return next;
    });
    setNow(Date.now());
  }, []);

  const pause = useCallback(() => {
    setTimer((current) => {
      if (!current.endAt) return current;
      const next = { endAt: null, remainingMs: Math.max(0, current.endAt - Date.now()) };
      persistTimer(next);
      return next;
    });
    setNow(Date.now());
  }, []);

  const reset = useCallback(() => {
    const next = { endAt: null, remainingMs: durationMs };
    persistTimer(next);
    setTimer(next);
    setNow(Date.now());
  }, [durationMs]);

  const toggle = isRunning ? pause : start;
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = Math.min(100, Math.max(0, ((durationMs - remainingMs) / durationMs) * 100));

  return { display, isRunning, progress, start, pause, toggle, reset };
}
