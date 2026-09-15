import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import {
  DEFAULT_SESSION_CONFIG,
  type SessionKey,
} from "../data/exercises";

type SessionConfig = Record<SessionKey, string[]>;

interface AppState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  sessionConfig: SessionConfig;
  updateSessionConfig: (updater: (prev: SessionConfig) => SessionConfig) => void;
  resetSessionConfig: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = usePersistedState<string[]>(
    "favorites",
    []
  );
  const [sessionConfig, setSessionConfig, resetSessionConfig] =
    usePersistedState<SessionConfig>("session_config", DEFAULT_SESSION_CONFIG);

  const updateSessionConfig = useCallback(
    (updater: (prev: SessionConfig) => SessionConfig) => {
      setSessionConfig(updater);
    },
    [setSessionConfig]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return (
    <AppContext value={{
      favorites,
      toggleFavorite,
      isFavorite,
      sessionConfig,
      updateSessionConfig,
      resetSessionConfig,
    }}>
      {children}
    </AppContext>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
