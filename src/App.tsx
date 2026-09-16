import { lazy, Suspense, useEffect, useState } from "react";
import { Skeleton, Toast } from "@heroui/react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { TimerProvider } from "./context/TimerProvider";
import AppShell from "./components/AppShell";
import RoutinePage from "./pages/RoutinePage";
import WorkPage from "./pages/WorkPage";
import { allNavigation } from "./navigation";
import type { Exercise } from "./data/exercises";

const ExerciseDetailModal = lazy(() => import("./components/ExerciseDetailModal"));
const ExercisesPage = lazy(() => import("./pages/ExercisesPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const PhysioPage = lazy(() => import("./pages/PhysioPage"));

function PageLoading() {
  return (
    <div aria-busy="true" aria-label="Cargando página…" className="space-y-5">
      <Skeleton className="h-10 w-56 rounded-xl" />
      <Skeleton className="h-5 w-full max-w-xl rounded-lg" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-56 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
      </div>
    </div>
  );
}

function AppContent() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const location = useLocation();

  useEffect(() => {
    const current = allNavigation.find((item) => item.path === location.pathname);
    document.title = current ? `${current.label} · Khiron` : "Khiron";
  }, [location.pathname]);

  return (
    <AppShell>
      <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/morning" element={<RoutinePage session="morning" onSelect={setSelectedExercise} />} />
        <Route path="/work" element={<WorkPage onSelect={setSelectedExercise} />} />
        <Route path="/night" element={<RoutinePage session="night" onSelect={setSelectedExercise} />} />
        <Route path="/exercises" element={<ExercisesPage onSelect={setSelectedExercise} />} />
        <Route path="/physio" element={<PhysioPage onSelect={setSelectedExercise} />} />
        <Route path="/favorites" element={<FavoritesPage onSelect={setSelectedExercise} />} />
        <Route path="*" element={<Navigate to="/morning" replace />} />
      </Routes>
      </Suspense>
      {selectedExercise ? (
        <Suspense fallback={null}>
          <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
        </Suspense>
      ) : null}
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <HashRouter>
          <Toast.Provider placement="top end" aria-label="Notificaciones" />
          <TimerProvider>
            <AppContent />
          </TimerProvider>
        </HashRouter>
      </AuthProvider>
    </AppProvider>
  );
}
