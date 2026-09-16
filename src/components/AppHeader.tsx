import { NavLink } from "react-router-dom";
import { MobileMoreMenu } from "./AppNavigation";
import ThemeToggle from "./ThemeToggle";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4">
        <NavLink to="/morning" className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <span className="grid size-8 place-items-center rounded-xl bg-accent text-sm font-black text-accent-foreground" aria-hidden="true">K</span>
          <span>
            <span className="block text-base font-bold leading-tight text-foreground">Khiron</span>
            <span className="block text-[0.6875rem] leading-tight text-muted">Movilidad Personalizada</span>
          </span>
        </NavLink>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileMoreMenu />
        </div>
      </div>
    </header>
  );
}
