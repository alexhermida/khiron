import { Alert, Chip } from "@heroui/react";
import { exercises, EXERCISES_TO_AVOID, type Exercise } from "../data/exercises";
import ExerciseGrid from "./ExerciseGrid";

interface PhysioTabProps {
  onSelect: (exercise: Exercise) => void;
}

export default function PhysioTab({ onSelect }: PhysioTabProps) {
  const dailyPhysio = exercises.filter(
    (exercise) => exercise.category === "physio" && exercise.frequency === "daily"
  );
  const weeklyPhysio = exercises.filter(
    (exercise) => exercise.category === "physio" && exercise.frequency === "3x-week"
  );

  return (
    <div className="space-y-10">
      <section aria-labelledby="daily-physio">
        <div className="mb-4">
          <h2 id="daily-physio" className="text-xl font-bold text-foreground">Cada día</h2>
          <p className="mt-1 text-sm text-muted">Ejercicios de estabilización y movilidad diaria.</p>
        </div>
        <ExerciseGrid exercises={dailyPhysio} onSelect={onSelect} />
      </section>

      <section aria-labelledby="weekly-physio">
        <div className="mb-4">
          <h2 id="weekly-physio" className="text-xl font-bold text-foreground">3 veces por semana</h2>
          <p className="mt-1 text-sm text-muted">Deja al menos 1 día de descanso entre sesiones.</p>
        </div>
        <ExerciseGrid exercises={weeklyPhysio} onSelect={onSelect} />
      </section>

      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Ejercicios que debes evitar</Alert.Title>
          <Alert.Description>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXERCISES_TO_AVOID.map((item) => (
                <Chip key={item} color="danger" variant="soft" size="sm">{item}</Chip>
              ))}
            </div>
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}
