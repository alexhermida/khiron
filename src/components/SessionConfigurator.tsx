import { useState } from "react";
import { Modal, Button, Checkbox, Label } from "@heroui/react";
import { exercises, type SessionKey } from "../data/exercises";
import { useApp } from "../context/useApp";

interface SessionConfiguratorProps {
  session: SessionKey;
}

const sessionLabels: Record<SessionKey, string> = {
  morning: "Mañana",
  night: "Noche",
};

const nonWorkExercises = exercises.filter((e) => e.category !== "work");

export default function SessionConfigurator({
  session,
}: SessionConfiguratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { sessionConfig, updateSessionConfig, resetSessionConfig } = useApp();
  const currentIds = sessionConfig[session];

  function toggleExercise(id: string) {
    updateSessionConfig((prev) => {
      const current = prev[session];
      const updated = current.includes(id)
        ? current.filter((eid) => eid !== id)
        : [...current, id];
      return { ...prev, [session]: updated };
    });
  }

  function moveExercise(id: string, direction: -1 | 1) {
    updateSessionConfig((prev) => {
      const current = [...prev[session]];
      const idx = current.indexOf(id);
      if (idx < 0) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= current.length) return prev;
      [current[idx], current[newIdx]] = [current[newIdx], current[idx]];
      return { ...prev, [session]: current };
    });
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        aria-label={`Configurar sesión ${sessionLabels[session]}`}
        onPress={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Configurar
      </Button>

      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant="blur"
      >
        <Modal.Container size="lg" placement="center" scroll="inside">
          <Modal.Dialog aria-label={`Configurar ${sessionLabels[session]}`}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                Configurar: {sessionLabels[session]}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              {currentIds.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">
                    Orden actual
                  </h3>
                  <div className="space-y-2">
                    {currentIds.map((id, idx) => {
                      const ex = exercises.find((e) => e.id === id);
                      if (!ex) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-2 p-2 bg-surface-secondary rounded-lg"
                        >
                          <span className="text-xs font-bold text-muted w-6 text-center">
                            {idx + 1}
                          </span>
                          <span className="flex-1 text-sm font-medium text-foreground">
                            {ex.title}
                          </span>
                          <Button
                            isIconOnly
                            variant="ghost"
                            size="sm"
                            isDisabled={idx === 0}
                            aria-label="Subir"
                            onPress={() => moveExercise(id, -1)}
                          >
                            ↑
                          </Button>
                          <Button
                            isIconOnly
                            variant="ghost"
                            size="sm"
                            isDisabled={idx === currentIds.length - 1}
                            aria-label="Bajar"
                            onPress={() => moveExercise(id, 1)}
                          >
                            ↓
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">
                Catálogo de ejercicios
              </h3>
              <div className="space-y-2">
                {nonWorkExercises.map((ex) => (
                  <Checkbox
                    key={ex.id}
                    id={`cfg-${session}-${ex.id}`}
                    isSelected={currentIds.includes(ex.id)}
                    onChange={() => toggleExercise(ex.id)}
                  >
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                      <Label htmlFor={`cfg-${session}-${ex.id}`}>
                        {ex.title}
                        <span className="ml-2 text-xs text-muted">
                          {ex.duration}
                        </span>
                      </Label>
                    </Checkbox.Content>
                  </Checkbox>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="tertiary"
                onPress={() => {
                  resetSessionConfig();
                  setIsOpen(false);
                }}
              >
                Restaurar por defecto
              </Button>
              <Button slot="close">Listo</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
