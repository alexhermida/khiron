import { createContext } from "react";
import type { SessionKey } from "../data/exercises";

export type SessionConfig = Record<SessionKey, string[]>;

export interface AppState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  sessionConfig: SessionConfig;
  updateSessionConfig: (updater: (prev: SessionConfig) => SessionConfig) => void;
  resetSessionConfig: () => void;
}

export const AppContext = createContext<AppState | null>(null);
