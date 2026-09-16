import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimer } from "../hooks/useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it("starts, pauses, and resumes from the timestamp deadline", () => {
    const { result } = renderHook(() => useTimer(vi.fn(), 5_000));

    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);

    act(() => vi.advanceTimersByTime(2_000));
    expect(result.current.display).toBe("00:03");

    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(3_000));
    expect(result.current.display).toBe("00:03");

    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);
  });

  it("completes once and resets the duration", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(onComplete, 1_000));

    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(1_000));

    expect(onComplete).toHaveBeenCalledOnce();
    expect(result.current.isRunning).toBe(false);
    expect(result.current.display).toBe("00:01");
  });

  it("restores a running timer after remount", () => {
    const first = renderHook(() => useTimer(vi.fn(), 10_000));
    act(() => first.result.current.start());
    act(() => vi.advanceTimersByTime(3_000));
    first.unmount();

    const second = renderHook(() => useTimer(vi.fn(), 10_000));
    expect(second.result.current.isRunning).toBe(true);
    expect(second.result.current.display).toBe("00:07");
  });

  it("reset returns to the full duration", () => {
    const { result } = renderHook(() => useTimer(vi.fn(), 5_000));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(2_000));
    act(() => result.current.reset());

    expect(result.current.isRunning).toBe(false);
    expect(result.current.display).toBe("00:05");
    expect(result.current.progress).toBe(0);
  });
});
