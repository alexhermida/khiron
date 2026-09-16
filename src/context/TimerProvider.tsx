import { useCallback, useRef, type ReactNode } from "react";
import { toast } from "@heroui/react";
import { useTimer } from "../hooks/useTimer";
import { TimerContext } from "./timer-context";

const ALERT_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

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

  return <TimerContext value={timer}>{children}</TimerContext>;
}
