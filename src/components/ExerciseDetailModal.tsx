import { Modal, Button, Chip } from "@heroui/react";
import type { Exercise } from "../data/exercises";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useDriveVideo } from "../hooks/useDriveVideo";
import { useDriveImage } from "../hooks/useDriveImage";
import VideoPlayer from "./VideoPlayer";
import ImageViewer from "./ImageViewer";

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  mobility: "Movilidad",
  physio: "Fisioterapia",
  work: "Trabajo",
};

const categoryBadgeColors: Record<string, "accent" | "success" | "warning"> = {
  mobility: "accent",
  physio: "success",
  work: "warning",
};

export default function ExerciseDetailModal({
  exercise,
  onClose,
}: ExerciseDetailModalProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const { isAuthenticated, login, accessToken } = useAuth();
  const { blobUrl, isLoading, error } = useDriveVideo(
    exercise?.driveFileId,
    accessToken
  );
  const {
    blobUrl: imageBlobUrl,
    isLoading: imageLoading,
    error: imageError,
  } = useDriveImage(exercise?.driveImageId, accessToken);

  if (!exercise) return null;

  const isOpen = !!exercise;
  const fav = isFavorite(exercise.id);
  const hasMedia = !!(exercise.driveFileId || exercise.driveImageId);

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      variant="blur"
    >
      <Modal.Container size="md" placement="center" scroll="outside">
        <Modal.Dialog aria-label={exercise.title}>
          <Modal.CloseTrigger />
          <Modal.Header>
            <div className="flex items-center gap-3">
              <Modal.Heading>{exercise.title}</Modal.Heading>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${categoryBadgeColors[exercise.category]}`}
              >
                {exercise.duration}
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {hasMedia && !isAuthenticated && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center">
                  <p className="text-sm text-accent mb-3">
                    Inicia sesión con Google para ver{" "}
                    {exercise.driveFileId ? "el vídeo" : "la imagen"}
                  </p>
                  <Button variant="primary" onPress={login}>
                    Iniciar sesión con Google
                  </Button>
                </div>
              )}
              {exercise.driveFileId && isAuthenticated && (
                <VideoPlayer
                  src={blobUrl}
                  isVisible={isOpen}
                  isLoading={isLoading}
                  error={error}
                />
              )}
              {exercise.driveImageId && isAuthenticated && (
                <ImageViewer
                  src={imageBlobUrl}
                  alt={exercise.title}
                  isLoading={imageLoading}
                  error={imageError}
                />
              )}
              <div>
                <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-1">
                  Instrucciones
                </h4>
                <p className="text-foreground leading-relaxed">
                  {exercise.description}
                </p>
              </div>
              {exercise.notes && (
                <div className="bg-warning/10 border border-warning/30 p-3 rounded-xl">
                  <p className="text-sm text-warning dark:text-warning">
                    <strong>Nota:</strong> {exercise.notes}
                  </p>
                </div>
              )}
              <div className="bg-surface-secondary p-4 rounded-xl border border-border">
                <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-1">
                  Por qué hacerlo
                </h4>
                <p className="text-foreground text-sm italic leading-snug">
                  {exercise.benefit}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Chip
                  size="sm"
                  color={categoryBadgeColors[exercise.category]}
                  variant="soft"
                >
                  {categoryLabels[exercise.category]}
                </Chip>
                {exercise.frequency === "3x-week" && (
                  <Chip size="sm" color="default" variant="soft">
                    3x/semana
                  </Chip>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={fav ? "danger" : "secondary"}
              onPress={() => toggleFavorite(exercise.id)}
            >
              {fav ? "Quitar favorito" : "Añadir favorito"}
            </Button>
            <Button slot="close" variant="primary">Entendido</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
