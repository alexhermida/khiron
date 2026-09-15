import { Card, Chip } from "@heroui/react";
import { exercises, EXERCISES_TO_AVOID, type Exercise } from "../data/exercises";
import ExerciseGrid from "./ExerciseGrid";

interface PhysioTabProps {
  onSelect: (exercise: Exercise) => void;
}

export default function PhysioTab({ onSelect }: PhysioTabProps) {
  const dailyPhysio = exercises.filter(
    (e) => e.category === "physio" && e.frequency === "daily"
  );
  const weeklyPhysio = exercises.filter(
    (e) => e.category === "physio" && e.frequency === "3x-week"
  );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">
          Diarios
        </h2>
        <ExerciseGrid exercises={dailyPhysio} onSelect={onSelect} />
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">
          3x por Semana (días no consecutivos)
        </h2>
        <ExerciseGrid exercises={weeklyPhysio} onSelect={onSelect} />
      </section>

      <Card className="border-danger/30 bg-danger/10">
        <Card.Header>
          <Card.Title className="text-danger">
            Ejercicios a Evitar
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-wrap gap-2">
            {EXERCISES_TO_AVOID.map((item) => (
              <Chip
                key={item}
                color="danger"
                variant="soft"
                size="sm"
              >
                {item}
              </Chip>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
