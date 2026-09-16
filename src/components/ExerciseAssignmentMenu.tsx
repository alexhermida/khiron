import type { Key } from "react";
import { Button, Dropdown, Label, toast } from "@heroui/react";
import type { Exercise, SessionKey } from "../data/exercises";
import { useApp } from "../context/useApp";
import { setExerciseSessions } from "../utils/sessionConfig";
import { CheckIcon, PlusIcon } from "./Icons";

const labels: Record<SessionKey, string> = {
  morning: "Mañana",
  night: "Noche",
};

export default function ExerciseAssignmentMenu({ exercise }: { exercise: Exercise }) {
  const { sessionConfig, updateSessionConfig } = useApp();
  const assigned = (Object.keys(labels) as SessionKey[]).filter((session) =>
    sessionConfig[session].includes(exercise.id)
  );

  if (exercise.category === "work") {
    return <span className="text-xs font-semibold text-warning">Incluido en Trabajo</span>;
  }

  function toggleSession(key: Key) {
    const session = String(key) as SessionKey;
    const next = new Set(assigned);
    if (next.has(session)) next.delete(session);
    else next.add(session);
    updateSessionConfig((previous) => setExerciseSessions(previous, exercise.id, next));
    toast.success(next.has(session) ? `Añadido a ${labels[session]}` : `Quitado de ${labels[session]}`, {
      description: exercise.title,
    });
  }

  const buttonLabel = assigned.length === 0
    ? "Añadir a rutina"
    : assigned.length === 1
      ? `En ${labels[assigned[0]]}`
      : "En 2 rutinas";

  return (
    <Dropdown>
      <Button size="sm" variant={assigned.length > 0 ? "secondary" : "primary"} aria-label={`Gestionar rutinas para ${exercise.title}`}>
        {assigned.length > 0 ? <CheckIcon className="size-4" /> : <PlusIcon className="size-4" />}
        {buttonLabel}
      </Button>
      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu onAction={toggleSession}>
          {(Object.keys(labels) as SessionKey[]).map((session) => (
            <Dropdown.Item key={session} id={session} textValue={labels[session]}>
              <span className="flex size-5 items-center justify-center" aria-hidden="true">
                {assigned.includes(session) ? <CheckIcon className="size-4 text-accent" /> : null}
              </span>
              <Label>{assigned.includes(session) ? "Quitar de" : "Añadir a"} {labels[session]}</Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
