import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { DesktopNavigation, MobileNavigation } from "./AppNavigation";
import GlobalTimer from "./GlobalTimer";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <div className="mx-auto flex min-h-dvh max-w-[1600px]">
        <DesktopNavigation />
        <div className="min-w-0 flex-1">
          <AppHeader />
          <div className="sticky top-0 z-20 flex h-0 items-center justify-end px-10 lg:h-20 lg:border-b lg:border-border/60 lg:bg-background/80 lg:backdrop-blur-xl">
            <GlobalTimer />
          </div>
          <main id="main-content" className="mx-auto w-full max-w-6xl px-4 pt-6 pb-44 sm:px-6 sm:pt-8 lg:px-10 lg:pt-2 lg:pb-12">
            {children}
          </main>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
}
