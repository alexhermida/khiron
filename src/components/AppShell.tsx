import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { DesktopNavigation, MobileNavigation } from "./AppNavigation";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <div className="mx-auto flex min-h-dvh max-w-[1600px]">
        <DesktopNavigation />
        <div className="min-w-0 flex-1">
          <AppHeader />
          <main id="main-content" className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 sm:px-6 sm:pt-8 lg:px-10 lg:pb-12">
            {children}
          </main>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
}
