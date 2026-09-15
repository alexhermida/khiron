import type { Exercise } from "../data/exercises";
import ExerciseCard from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  onSelect: (exercise: Exercise) => void;
  emptyMessage?: string;
}

export default function ExerciseGrid({
  exercises,
  onSelect,
  emptyMessage = "No hay ejercicios en esta sección.",
}: ExerciseGridProps) {
  if (exercises.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 dark:text-gray-500 italic">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} onSelect={onSelect} />
      ))}
    </div>
  );
}
