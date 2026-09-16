import { useState } from "react";
import { Button, Drawer, toast } from "@heroui/react";
import { Link } from "react-router-dom";
import { exercises, type SessionKey } from "../data/exercises";
import { useApp } from "../context/useApp";
import { moveSessionExercise, toggleSessionExercise } from "../utils/sessionConfig";
import { ChevronDownIcon, ChevronUpIcon, LibraryIcon, SettingsIcon } from "./Icons";

interface SessionConfiguratorProps {
  session: SessionKey;
}

const sessionLabels: Record<SessionKey, string> = {
  morning: "Mañana",
  night: "Noche",
};

export default function SessionConfigurator({ session }: SessionConfiguratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { sessionConfig, updateSessionConfig, resetSessionConfig } = useApp();
  const currentIds = sessionConfig[session];

  function removeExercise(id: string) {
    updateSessionConfig((previous) => toggleSessionExercise(previous, session, id));
  }

  function moveExercise(id: string, direction: -1 | 1) {
    updateSessionConfig((previous) => moveSessionExercise(previous, session, id, direction));
  }

  function restoreDefaults() {
    const previousConfig = sessionConfig;
    resetSessionConfig();
    const toastId = toast("Rutinas restauradas", {
      description: "Se ha recuperado la selección inicial.",
      actionProps: {
        children: "Deshacer",
        onPress: () => {
          updateSessionConfig(() => previousConfig);
          toast.close(toastId);
        },
      },
    });
  }

  return (
    <>
      <Button variant="secondary" aria-label={`Editar rutina de ${sessionLabels[session]}`} onPress={() => setIsOpen(true)}>
        <SettingsIcon className="size-4" />
        Editar rutina
      </Button>

      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="overscroll-contain">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Rutina de {sessionLabels[session].toLowerCase()}</Drawer.Heading>
              <p className="text-sm text-muted">Organiza el orden o elimina movimientos de esta rutina.</p>
            </Drawer.Header>
            <Drawer.Body>
              {currentIds.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-6 text-center">
                  <p className="font-medium text-foreground">Esta rutina está vacía</p>
                  <p className="mt-1 text-sm text-muted">Añade ejercicios desde el catálogo.</p>
                </div>
              ) : (
                <ol className="space-y-2">
                  {currentIds.map((id, index) => {
                    const exercise = exercises.find((item) => item.id === id);
                    if (!exercise) return null;
                    return (
                      <li key={id} className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface-secondary p-2">
                        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-surface text-xs font-bold text-muted">{index + 1}</span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{exercise.title}</span>
                        <Button isIconOnly size="sm" variant="ghost" isDisabled={index === 0} aria-label={`Subir ${exercise.title}`} onPress={() => moveExercise(id, -1)}>
                          <ChevronUpIcon className="size-4" />
                        </Button>
                        <Button isIconOnly size="sm" variant="ghost" isDisabled={index === currentIds.length - 1} aria-label={`Bajar ${exercise.title}`} onPress={() => moveExercise(id, 1)}>
                          <ChevronDownIcon className="size-4" />
                        </Button>
                        <Button size="sm" variant="tertiary" aria-label={`Quitar ${exercise.title}`} onPress={() => removeExercise(id)}>
                          Quitar
                        </Button>
                      </li>
                    );
                  })}
                </ol>
              )}

              <Link to="/exercises" onClick={() => setIsOpen(false)} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <LibraryIcon className="size-4" />
                Explorar ejercicios
              </Link>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="tertiary" onPress={restoreDefaults}>Restaurar rutinas</Button>
              <Button slot="close">Listo</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
}
