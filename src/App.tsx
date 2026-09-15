import { useState } from "react";
import { Tabs } from "@heroui/react";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import AppHeader from "./components/AppHeader";
import ExerciseGrid from "./components/ExerciseGrid";
import ExerciseDetailModal from "./components/ExerciseDetailModal";
import PhysioTab from "./components/PhysioTab";
import WorkTimer from "./components/WorkTimer";
import SessionConfigurator from "./components/SessionConfigurator";
import {
  exercises,
  getExerciseById,
  WORK_EXERCISE_IDS,
  type Exercise,
} from "./data/exercises";

function AppContent() {
  const { sessionConfig, favorites } = useApp();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const morningExercises = sessionConfig.morning
    .map(getExerciseById)
    .filter((e): e is Exercise => !!e);

  const workExercises = WORK_EXERCISE_IDS.map(getExerciseById).filter(
    (e): e is Exercise => !!e
  );

  const nightExercises = sessionConfig.night
    .map(getExerciseById)
    .filter((e): e is Exercise => !!e);

  const favExercises = exercises.filter((e) => favorites.includes(e.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppHeader />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs variant="secondary">
          <Tabs.ListContainer className="mb-6">
            <Tabs.List aria-label="Sesiones">
              <Tabs.Tab id="morning">Mañana<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="work">Trabajo<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="night">Noche<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="physio">Fisio<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="favs">Favoritos<Tabs.Indicator /></Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel id="morning">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-foreground">Sesión Mañana</h2>
              <SessionConfigurator session="morning" />
            </div>
            <ExerciseGrid
              exercises={morningExercises}
              onSelect={setSelectedExercise}
            />
          </Tabs.Panel>

          <Tabs.Panel id="work">
            <WorkTimer />
            <ExerciseGrid
              exercises={workExercises}
              onSelect={setSelectedExercise}
            />
          </Tabs.Panel>

          <Tabs.Panel id="night">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-foreground">Sesión Noche</h2>
              <SessionConfigurator session="night" />
            </div>
            <ExerciseGrid
              exercises={nightExercises}
              onSelect={setSelectedExercise}
            />
          </Tabs.Panel>

          <Tabs.Panel id="physio">
            <PhysioTab onSelect={setSelectedExercise} />
          </Tabs.Panel>

          <Tabs.Panel id="favs">
            <ExerciseGrid
              exercises={favExercises}
              onSelect={setSelectedExercise}
              emptyMessage="No tienes ejercicios favoritos guardados aún."
            />
          </Tabs.Panel>
        </Tabs>
      </main>

      <ExerciseDetailModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
}
