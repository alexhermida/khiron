import { Button } from "@heroui/react";
import { useTheme } from "../context/useTheme";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "oscuro" : "claro";

  return (
    <Button isIconOnly variant="ghost" aria-label={`Cambiar a tema ${nextTheme}`} onPress={toggleTheme}>
      {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
    </Button>
  );
}
