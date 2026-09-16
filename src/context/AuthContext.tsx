import { useState, useCallback, type ReactNode } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./auth-context";

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
