import { Card, Button, Avatar, Chip } from "@heroui/react";
import type { Exercise } from "../data/exercises";
import { useApp } from "../context/AppContext";

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

const categoryColor: Record<string, "accent" | "success" | "warning"> = {
  mobility: "accent",
  physio: "success",
  work: "warning",
};

const categoryInitials: Record<string, string> = {
  mobility: "M",
  physio: "F",
  work: "T",
};

export default function ExerciseCard({ exercise, onSelect }: ExerciseCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(exercise.id);
  const color = categoryColor[exercise.category];
  const initial = categoryInitials[exercise.category];

  const handlePress = () => onSelect(exercise);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Card.Content className="p-3 flex flex-col gap-2">
        {/* Top row: avatar + heart */}
        <div className="flex items-center justify-between">
          <Avatar size="sm" color={color} variant="soft">
            <Avatar.Fallback>{initial}</Avatar.Fallback>
          </Avatar>
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
            onPress={() => toggleFavorite(exercise.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${fav ? "text-danger" : "text-muted"}`}
              viewBox="0 0 20 20"
              fill={fav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={fav ? 0 : 1.5}
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </Button>
        </div>

        {/* Clickable content area: title + chip */}
        <div
          role="button"
          tabIndex={0}
          onClick={handlePress}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePress();
            }
          }}
          className="flex flex-col gap-2 cursor-pointer"
        >
          <p className="font-semibold text-foreground line-clamp-2 text-sm">
            {exercise.title}
          </p>
          <div>
            <Chip size="sm" color={color} variant="soft">
              {exercise.duration}
            </Chip>
          </div>
        </div>

        {/* Action button */}
        <Button
          size="sm"
          variant="tertiary"
          onPress={handlePress}
          fullWidth
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {exercise.driveFileId ? "Ver video" : "Ver detalle"}
        </Button>
      </Card.Content>
    </Card>
  );
}
