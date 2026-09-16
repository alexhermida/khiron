import type { Exercise } from "../data/exercises";
import ExerciseCard from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  onSelect: (exercise: Exercise) => void;
  emptyMessage?: string;
  showSessionActions?: boolean;
}

export default function ExerciseGrid({
  exercises,
  onSelect,
  emptyMessage = "No hay ejercicios en esta sección.",
  showSessionActions = false,
}: ExerciseGridProps) {
  if (exercises.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
        <p className="font-medium text-foreground">No hay ejercicios</p>
        <p className="mt-1 text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} onSelect={onSelect} showSessionActions={showSessionActions} />
      ))}
    </div>
  );
}
