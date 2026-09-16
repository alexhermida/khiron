import { Avatar, Button, Card, Chip } from "@heroui/react";
import type { Exercise } from "../data/exercises";
import { useApp } from "../context/useApp";
import ExerciseAssignmentMenu from "./ExerciseAssignmentMenu";
import { HeartIcon, PlayIcon } from "./Icons";

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
  showSessionActions?: boolean;
}

const categoryColor: Record<Exercise["category"], "accent" | "success" | "warning"> = {
  mobility: "accent",
  physio: "success",
  work: "warning",
};

const categoryMeta: Record<Exercise["category"], { initial: string; label: string }> = {
  mobility: { initial: "M", label: "Movilidad" },
  physio: { initial: "F", label: "Fisioterapia" },
  work: { initial: "T", label: "Trabajo" },
};

export default function ExerciseCard({ exercise, onSelect, showSessionActions = false }: ExerciseCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(exercise.id);
  const color = categoryColor[exercise.category];
  const meta = categoryMeta[exercise.category];
  const hasVideo = Boolean(exercise.driveFileId);

  return (
    <Card className="h-full border border-border/60 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md" role="article" aria-labelledby={`exercise-${exercise.id}`}>
      <Card.Header className="flex-row items-start gap-3">
        <Avatar size="sm" color={color} variant="soft" aria-label={meta.label}>
          <Avatar.Fallback>{meta.initial}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <Card.Title id={`exercise-${exercise.id}`} className="line-clamp-2 text-base text-pretty">{exercise.title}</Card.Title>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip size="sm" color={color} variant="soft">{exercise.duration}</Chip>
            {exercise.frequency === "3x-week" ? <Chip size="sm" variant="tertiary">3× semana</Chip> : null}
          </div>
        </div>
        <Button isIconOnly variant="ghost" size="sm" aria-label={favorite ? `Quitar ${exercise.title} de favoritos` : `Añadir ${exercise.title} a favoritos`} onPress={() => toggleFavorite(exercise.id)}>
          <HeartIcon filled={favorite} className={`size-5 ${favorite ? "text-danger" : "text-muted"}`} />
        </Button>
      </Card.Header>

      <Card.Content className="flex-1">
        <p className="line-clamp-3 text-sm leading-6 text-muted">{exercise.description}</p>
      </Card.Content>

      <Card.Footer className="mt-auto flex flex-wrap items-center justify-between gap-2">
        <Button size="sm" variant="tertiary" onPress={() => onSelect(exercise)}>
          <PlayIcon className="size-4" />
          {hasVideo ? "Ver vídeo" : "Ver detalle"}
        </Button>
        {showSessionActions ? <ExerciseAssignmentMenu exercise={exercise} /> : null}
      </Card.Footer>
    </Card>
  );
}
