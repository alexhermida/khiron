import type { Exercise, ExerciseCategory } from "../data/exercises";

export type ExerciseCategoryFilter = "all" | ExerciseCategory;

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

export function filterExercises(
  items: Exercise[],
  query: string,
  category: ExerciseCategoryFilter
) {
  const normalizedQuery = normalize(query.trim());

  return items.filter((exercise) => {
    if (category !== "all" && exercise.category !== category) return false;
    if (!normalizedQuery) return true;
    return normalize(`${exercise.title} ${exercise.description} ${exercise.benefit}`).includes(normalizedQuery);
  });
}
