import { useEffect, useState } from "react";
import { Alert, Button, toast } from "@heroui/react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { InstallIcon } from "./Icons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    function handlePrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }
    function handleInstalled() {
      setInstallPrompt(null);
    }
    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (isStandalone() || (!installPrompt && !isIOS)) return null;

  async function install() {
    if (!installPrompt) {
      toast.info("Instala Khiron desde Safari", {
        description: "Pulsa Compartir y después “Añadir a pantalla de inicio”.",
        timeout: 7000,
      });
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstallPrompt(null);
  }

  return (
    <Button fullWidth variant="secondary" onPress={install}>
      <InstallIcon className="size-4" />
      Instalar Khiron
    </Button>
  );
}

export function PwaStatus() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh && !offlineReady) return null;

  return (
    <div className="mb-6" role="status">
      <Alert status={needRefresh ? "accent" : "success"}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{needRefresh ? "Nueva versión disponible" : "Khiron está listo sin conexión"}</Alert.Title>
          <Alert.Description>
            {needRefresh
              ? "Actualiza para usar las últimas mejoras."
              : "Las rutinas y el catálogo seguirán disponibles. Los vídeos necesitan conexión."}
          </Alert.Description>
        </Alert.Content>
        {needRefresh ? (
          <Button size="sm" onPress={() => updateServiceWorker(true)}>Actualizar</Button>
        ) : (
          <Button size="sm" variant="tertiary" onPress={() => setOfflineReady(false)}>Entendido</Button>
        )}
        {needRefresh ? <Button size="sm" variant="ghost" onPress={() => setNeedRefresh(false)}>Ahora no</Button> : null}
      </Alert>
    </div>
  );
}
