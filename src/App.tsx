import { lazy, Suspense, useEffect } from "react";
import { Skeleton, Toast } from "@heroui/react";
import { HashRouter, Navigate, Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { TimerProvider } from "./context/TimerProvider";
import AppShell from "./components/AppShell";
import RoutinePage from "./pages/RoutinePage";
import WorkPage from "./pages/WorkPage";
import { allNavigation } from "./navigation";
import { getExerciseById, type Exercise } from "./data/exercises";

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
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedExercise = getExerciseById(searchParams.get("exercise") ?? "") ?? null;

  function selectExercise(exercise: Exercise) {
    const next = new URLSearchParams(searchParams);
    next.set("exercise", exercise.id);
    setSearchParams(next);
  }

  function closeExercise() {
    const next = new URLSearchParams(searchParams);
    next.delete("exercise");
    setSearchParams(next, { replace: true });
  }

  useEffect(() => {
    const current = allNavigation.find((item) => item.path === location.pathname);
    document.title = current ? `${current.label} · Khiron` : "Khiron";
  }, [location.pathname]);

  return (
    <AppShell>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/morning" element={<RoutinePage session="morning" onSelect={selectExercise} />} />
          <Route path="/work" element={<WorkPage onSelect={selectExercise} />} />
          <Route path="/night" element={<RoutinePage session="night" onSelect={selectExercise} />} />
          <Route path="/exercises" element={<ExercisesPage onSelect={selectExercise} />} />
          <Route path="/physio" element={<PhysioPage onSelect={selectExercise} />} />
          <Route path="/favorites" element={<FavoritesPage onSelect={selectExercise} />} />
          <Route path="*" element={<Navigate to="/morning" replace />} />
        </Routes>
      </Suspense>
      {selectedExercise ? (
        <Suspense fallback={null}>
          <ExerciseDetailModal exercise={selectedExercise} onClose={closeExercise} />
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
