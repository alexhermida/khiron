import type { Exercise } from "../data/exercises";
import { getExerciseById, WORK_EXERCISE_IDS } from "../data/exercises";
import ExerciseGrid from "../components/ExerciseGrid";
import PageHeader from "../components/PageHeader";
import WorkTimer from "../components/WorkTimer";

export default function WorkPage({ onSelect }: { onSelect: (exercise: Exercise) => void }) {
  const workExercises = WORK_EXERCISE_IDS.map(getExerciseById).filter(
    (exercise): exercise is Exercise => Boolean(exercise)
  );

  return (
    <>
      <PageHeader eyebrow="Pausa activa" title="Rutina de trabajo" description="Levántate, cambia de postura y descarga la espalda cada 50 minutos." />
      <WorkTimer />
      <ExerciseGrid exercises={workExercises} onSelect={onSelect} />
    </>
  );
}
