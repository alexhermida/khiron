import { useEffect, useState } from "react";
import { Toast } from "@heroui/react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import AppShell from "./components/AppShell";
import ExerciseDetailModal from "./components/ExerciseDetailModal";
import FavoritesPage from "./pages/FavoritesPage";
import ExercisesPage from "./pages/ExercisesPage";
import PhysioPage from "./pages/PhysioPage";
import RoutinePage from "./pages/RoutinePage";
import WorkPage from "./pages/WorkPage";
import { allNavigation } from "./navigation";
import type { Exercise } from "./data/exercises";

function AppContent() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const location = useLocation();

  useEffect(() => {
    const current = allNavigation.find((item) => item.path === location.pathname);
    document.title = current ? `${current.label} · Khiron` : "Khiron";
  }, [location.pathname]);

  return (
    <AppShell>
      <Routes>
        <Route path="/morning" element={<RoutinePage session="morning" onSelect={setSelectedExercise} />} />
        <Route path="/work" element={<WorkPage onSelect={setSelectedExercise} />} />
        <Route path="/night" element={<RoutinePage session="night" onSelect={setSelectedExercise} />} />
        <Route path="/exercises" element={<ExercisesPage onSelect={setSelectedExercise} />} />
        <Route path="/physio" element={<PhysioPage onSelect={setSelectedExercise} />} />
        <Route path="/favorites" element={<FavoritesPage onSelect={setSelectedExercise} />} />
        <Route path="*" element={<Navigate to="/morning" replace />} />
      </Routes>
      <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <HashRouter>
          <Toast.Provider placement="bottom end" aria-label="Notificaciones" />
          <AppContent />
        </HashRouter>
      </AuthProvider>
    </AppProvider>
  );
}
