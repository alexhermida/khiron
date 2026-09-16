import { useContext } from "react";
import { TimerContext } from "./timer-context";

export function useWorkTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useWorkTimer must be used within TimerProvider");
  return context;
}
