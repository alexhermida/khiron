import type { ComponentType, SVGProps } from "react";
import {
  ActivityIcon,
  BriefcaseIcon,
  HeartIcon,
  LibraryIcon,
  MoonIcon,
  SunIcon,
} from "./components/Icons";

export type AppRoute = "/morning" | "/work" | "/night" | "/exercises" | "/physio" | "/favorites";

export interface NavigationItem {
  path: AppRoute;
  label: string;
  shortLabel?: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const primaryNavigation: NavigationItem[] = [
  { path: "/morning", label: "Mañana", description: "Activa el cuerpo", icon: SunIcon },
  { path: "/work", label: "Trabajo", description: "Pausa activa", icon: BriefcaseIcon },
  { path: "/night", label: "Noche", description: "Baja el ritmo", icon: MoonIcon },
];

export const libraryNavigation: NavigationItem[] = [
  { path: "/exercises", label: "Ejercicios", description: "Explora el catálogo", icon: LibraryIcon },
];

export const secondaryNavigation: NavigationItem[] = [
  { path: "/physio", label: "Fisioterapia", shortLabel: "Fisio", description: "Rutina prescrita", icon: ActivityIcon },
  { path: "/favorites", label: "Favoritos", description: "Tus ejercicios guardados", icon: HeartIcon },
];

export const allNavigation = [
  ...primaryNavigation,
  ...libraryNavigation,
  ...secondaryNavigation,
];
