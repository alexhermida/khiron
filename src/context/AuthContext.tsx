import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
      setError(null);
    },
    onError: () => {
      setError("Error al iniciar sesión con Google");
    },
    scope: "https://www.googleapis.com/auth/drive.readonly",
    flow: "implicit",
  });

  const login = useCallback(() => {
    setError(null);
    googleLogin();
  }, [googleLogin]);

  const logout = useCallback(() => {
    setAccessToken(null);
    setError(null);
  }, []);

  return (
    <AuthContext value={{
      accessToken,
      isAuthenticated: accessToken !== null,
      login,
      logout,
      error,
    }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
