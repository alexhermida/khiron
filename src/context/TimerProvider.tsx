import { useCallback, useRef, type ReactNode } from "react";
import { toast } from "@heroui/react";
import { useTimer } from "../hooks/useTimer";
import { TimerContext } from "./timer-context";

const ALERT_URL = `${import.meta.env.BASE_URL}timer-complete.wav`;

export function TimerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleComplete = useCallback(() => {
    toast.info("Es hora de moverte", {
      description: "Abre la rutina de Trabajo para hacer tu pausa activa.",
      timeout: 0,
    });
    if (!audioRef.current) audioRef.current = new Audio(ALERT_URL);
    audioRef.current.play().catch(() => undefined);
  }, []);

  const timer = useTimer(handleComplete);
  const { start: startTimer } = timer;

  const start = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ALERT_URL);
      audioRef.current.load();
    }
    startTimer();
  }, [startTimer]);

  const value = {
    ...timer,
    start,
    toggle: timer.isRunning ? timer.pause : start,
  };

  return <TimerContext value={value}>{children}</TimerContext>;
}
