import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function TestProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId="test-client-id">
        <AppProvider>
          <AuthProvider>
            <MemoryRouter>{children}</MemoryRouter>
          </AuthProvider>
        </AppProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
