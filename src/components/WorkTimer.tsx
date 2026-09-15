import { useRef, useCallback } from "react";
import { Card, Button } from "@heroui/react";
import { useTimer } from "../hooks/useTimer";

const ALERT_URL =
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

export default function WorkTimer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleComplete = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ALERT_URL);
    }
    audioRef.current.play().catch(() => {});
  }, []);

  const { display, isRunning, toggle } = useTimer(handleComplete);

  return (
    <Card className="mb-6 border-accent/30 dark:border-accent/30">
      <Card.Content>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">
                Temporizador de Pausa Activa
              </p>
              <p className="text-sm text-muted">
                Próximo recordatorio en:
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-foreground tabular-nums">
              {display}
            </span>
            <Button
              variant={isRunning ? "danger" : "primary"}
              onPress={toggle}
            >
              {isRunning ? "Pausar" : "Iniciar Turno"}
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
