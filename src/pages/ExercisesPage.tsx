import type { Exercise } from "../data/exercises";
import { exercises } from "../data/exercises";
import ExerciseGrid from "../components/ExerciseGrid";
import PageHeader from "../components/PageHeader";

export default function ExercisesPage({ onSelect }: { onSelect: (exercise: Exercise) => void }) {
  return (
    <>
      <PageHeader eyebrow="Biblioteca" title="Todos los ejercicios" description="Explora la colección completa y abre cualquier ejercicio para ver sus indicaciones." />
      <ExerciseGrid exercises={exercises} onSelect={onSelect} />
    </>
  );
}
