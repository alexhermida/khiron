import { useDeferredValue } from "react";
import { Button, Card, Label, SearchField } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import type { Exercise } from "../data/exercises";
import { exercises } from "../data/exercises";
import { filterExercises, type ExerciseCategoryFilter } from "../utils/filterExercises";
import ExerciseGrid from "../components/ExerciseGrid";
import PageHeader from "../components/PageHeader";

const categories: { id: ExerciseCategoryFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "mobility", label: "Movilidad" },
  { id: "work", label: "Trabajo" },
  { id: "physio", label: "Fisioterapia" },
];

function isCategory(value: string | null): value is ExerciseCategoryFilter {
  return categories.some((category) => category.id === value);
}

export default function ExercisesPage({ onSelect }: { onSelect: (exercise: Exercise) => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const requestedCategory = searchParams.get("category");
  const category = isCategory(requestedCategory) ? requestedCategory : "all";
  const deferredQuery = useDeferredValue(query);
  const filteredExercises = filterExercises(exercises, deferredQuery, category);

  function setFilter(nextQuery: string, nextCategory: ExerciseCategoryFilter) {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory !== "all") params.set("category", nextCategory);
    setSearchParams(params, { replace: true });
  }

  return (
    <>
      <PageHeader eyebrow="Biblioteca" title="Todos los ejercicios" description="Busca un movimiento y añádelo a tu rutina de mañana o de noche." />

      <Card className="mb-6 border border-border/60" variant="secondary">
        <Card.Content className="gap-4">
          <SearchField fullWidth name="exercise-search" value={query} onChange={(value) => setFilter(value, category)} variant="secondary">
            <Label>Buscar ejercicios</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Nombre, beneficio o movimiento…" autoComplete="off" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">Filtrar por tipo</p>
            <div className="flex flex-wrap gap-2" aria-label="Categorías de ejercicios">
              {categories.map((item) => (
                <Button key={item.id} size="sm" variant={category === item.id ? "primary" : "tertiary"} aria-pressed={category === item.id} onPress={() => setFilter(query, item.id)}>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </Card.Content>
      </Card>

      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {filteredExercises.length} {filteredExercises.length === 1 ? "ejercicio" : "ejercicios"}
      </p>
      <ExerciseGrid
        exercises={filteredExercises}
        onSelect={onSelect}
        showSessionActions
        emptyMessage="Prueba otra búsqueda o elimina algún filtro."
      />
    </>
  );
}
