import type { Exercise, SessionKey } from "../data/exercises";
import { getExerciseById } from "../data/exercises";
import { useApp } from "../context/useApp";
import ExerciseGrid from "../components/ExerciseGrid";
import PageHeader from "../components/PageHeader";
import SessionConfigurator from "../components/SessionConfigurator";

const content: Record<SessionKey, { eyebrow: string; title: string; description: string }> = {
  morning: {
    eyebrow: "Empieza con movimiento",
    title: "Rutina de mañana",
    description: "Activa caderas, columna y core con una secuencia suave para comenzar el día.",
  },
  night: {
    eyebrow: "Cierra el día",
    title: "Rutina de noche",
    description: "Reduce tensión y recupera movilidad antes de descansar.",
  },
};

export default function RoutinePage({ session, onSelect }: { session: SessionKey; onSelect: (exercise: Exercise) => void }) {
  const { sessionConfig } = useApp();
  const routine = sessionConfig[session]
    .map(getExerciseById)
    .filter((exercise): exercise is Exercise => Boolean(exercise));

  return (
    <>
      <PageHeader {...content[session]} action={<SessionConfigurator session={session} />} />
      <p className="mb-4 text-sm font-medium text-muted">{routine.length} ejercicios en orden</p>
      <ExerciseGrid exercises={routine} onSelect={onSelect} emptyMessage="Tu rutina está vacía. Añade ejercicios desde el catálogo." />
    </>
  );
}
