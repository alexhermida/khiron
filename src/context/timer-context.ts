import { createContext } from "react";

export interface TimerState {
  display: string;
  isRunning: boolean;
  progress: number;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
}

export const TimerContext = createContext<TimerState | null>(null);
