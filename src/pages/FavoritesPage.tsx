import type { Exercise } from "../data/exercises";
import { exercises } from "../data/exercises";
import { useApp } from "../context/useApp";
import ExerciseGrid from "../components/ExerciseGrid";
import PageHeader from "../components/PageHeader";

export default function FavoritesPage({ onSelect }: { onSelect: (exercise: Exercise) => void }) {
  const { favorites } = useApp();
  const favoriteExercises = exercises.filter((exercise) => favorites.includes(exercise.id));

  return (
    <>
      <PageHeader eyebrow="Acceso rápido" title="Favoritos" description="Reúne aquí los movimientos que quieres tener siempre a mano." />
      <ExerciseGrid exercises={favoriteExercises} onSelect={onSelect} emptyMessage="Todavía no tienes favoritos. Guarda ejercicios desde cualquier tarjeta." />
    </>
  );
}
