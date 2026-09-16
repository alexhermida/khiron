import { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { NavLink } from "react-router-dom";
import {
  libraryNavigation,
  primaryNavigation,
  secondaryNavigation,
  type NavigationItem,
} from "../navigation";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon } from "./Icons";
import { InstallAppButton } from "./PwaControls";

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    "group flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-accent text-accent-foreground shadow-sm"
      : "text-muted hover:bg-surface-secondary hover:text-foreground",
  ].join(" ");
}

function NavigationLink({ item, onNavigate }: { item: NavigationItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink to={item.path} className={navClassName} onClick={onNavigate}>
      <Icon className="size-5 shrink-0" />
      <span className="min-w-0">
        <span className="block truncate">{item.label}</span>
        <span className="block truncate text-xs font-normal opacity-75">{item.description}</span>
      </span>
    </NavLink>
  );
}

function Brand() {
  return (
    <NavLink to="/morning" className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      <span className="grid size-10 place-items-center rounded-2xl bg-accent text-lg font-black text-accent-foreground shadow-sm" aria-hidden="true">K</span>
      <span>
        <span className="block text-lg font-bold tracking-tight text-foreground">Khiron</span>
        <span className="block text-xs text-muted">Movilidad personal</span>
      </span>
    </NavLink>
  );
}

export function DesktopNavigation() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border/70 bg-surface/85 px-4 py-5 backdrop-blur-xl lg:flex">
      <Brand />
      <nav aria-label="Navegación principal" className="mt-8 flex flex-1 flex-col gap-6">
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-widest text-muted uppercase">Rutinas</p>
          <div className="space-y-1">{primaryNavigation.map((item) => <NavigationLink key={item.path} item={item} />)}</div>
        </div>
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-widest text-muted uppercase">Biblioteca</p>
          <div className="space-y-1">{libraryNavigation.map((item) => <NavigationLink key={item.path} item={item} />)}</div>
        </div>
        <div>
          <p className="mb-2 px-3 text-xs font-semibold tracking-widest text-muted uppercase">Más</p>
          <div className="space-y-1">{secondaryNavigation.map((item) => <NavigationLink key={item.path} item={item} />)}</div>
        </div>
      </nav>
      <div className="flex items-center justify-between border-t border-border/70 pt-4">
        <span className="text-sm text-muted">Apariencia</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  const items = [...primaryNavigation, ...libraryNavigation];
  return (
    <nav aria-label="Navegación principal" className="mobile-navigation fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-surface/95 px-2 pt-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.6875rem] font-semibold transition-colors ${isActive ? "text-accent" : "text-muted hover:text-foreground"}`}
            >
              <Icon className="size-5" />
              <span>{item.shortLabel ?? item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileMoreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button isIconOnly aria-label="Abrir más opciones" variant="ghost" onPress={() => setIsOpen(true)} className="lg:hidden">
        <MenuIcon className="size-5" />
      </Button>
      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="overscroll-contain">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Más opciones</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav aria-label="Navegación secundaria" className="space-y-1">
                {secondaryNavigation.map((item) => <NavigationLink key={item.path} item={item} onNavigate={() => setIsOpen(false)} />)}
              </nav>
              <div className="mt-6">
                <InstallAppButton />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-surface-secondary p-3">
                <span className="text-sm font-medium text-foreground">Tema de la aplicación</span>
                <ThemeToggle />
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
}
