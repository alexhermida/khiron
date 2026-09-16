import { useCallback, type ReactNode } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { DEFAULT_SESSION_CONFIG } from "../data/exercises";
import { AppContext, type SessionConfig } from "./app-context";

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
