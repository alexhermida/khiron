import { createContext } from "react";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthState | null>(null);
