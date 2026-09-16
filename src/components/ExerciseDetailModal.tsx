import { Alert, Button, Card, Chip, Modal } from "@heroui/react";
import type { Exercise } from "../data/exercises";
import { useApp } from "../context/useApp";
import { useAuth } from "../context/useAuth";
import { useDriveVideo } from "../hooks/useDriveVideo";
import { useDriveImage } from "../hooks/useDriveImage";
import VideoPlayer from "./VideoPlayer";
import ImageViewer from "./ImageViewer";
import { HeartIcon } from "./Icons";

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const categoryLabels: Record<Exercise["category"], string> = {
  mobility: "Movilidad",
  physio: "Fisioterapia",
  work: "Trabajo",
};

const categoryColors: Record<Exercise["category"], "accent" | "success" | "warning"> = {
  mobility: "accent",
  physio: "success",
  work: "warning",
};

export default function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const { isAuthenticated, login, accessToken, error: authError } = useAuth();
  const { blobUrl, isLoading, error } = useDriveVideo(exercise?.driveFileId, accessToken);
  const { blobUrl: imageBlobUrl, isLoading: imageLoading, error: imageError } = useDriveImage(exercise?.driveImageId, accessToken);

  if (!exercise) return null;

  const favorite = isFavorite(exercise.id);
  const hasMedia = Boolean(exercise.driveFileId || exercise.driveImageId);

  return (
    <Modal.Backdrop isOpen onOpenChange={(open) => { if (!open) onClose(); }} variant="blur">
      <Modal.Container size="md" placement="auto" scroll="inside">
        <Modal.Dialog aria-label={exercise.title} className="overscroll-contain">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading className="pe-8 text-pretty">{exercise.title}</Modal.Heading>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip size="sm" color={categoryColors[exercise.category]} variant="soft">{categoryLabels[exercise.category]}</Chip>
              <Chip size="sm" variant="tertiary">{exercise.duration}</Chip>
              {exercise.frequency === "3x-week" ? <Chip size="sm" variant="tertiary">3× semana</Chip> : null}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-5">
              {hasMedia && !isAuthenticated ? (
                <Alert status="accent">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Demostración privada</Alert.Title>
                    <Alert.Description>Inicia sesión con Google para ver {exercise.driveFileId ? "el vídeo" : "la imagen"}.</Alert.Description>
                    <Button className="mt-3" size="sm" onPress={login}>Iniciar sesión con Google</Button>
                  </Alert.Content>
                </Alert>
              ) : null}
              {authError ? (
                <Alert status="danger">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>No se pudo iniciar sesión</Alert.Title>
                    <Alert.Description>{authError}. Vuelve a intentarlo.</Alert.Description>
                  </Alert.Content>
                </Alert>
              ) : null}
              {exercise.driveFileId && isAuthenticated ? (
                <VideoPlayer src={blobUrl} title={`Demostración de ${exercise.title}`} isVisible isLoading={isLoading} error={error} />
              ) : null}
              {exercise.driveImageId && isAuthenticated ? (
                <ImageViewer src={imageBlobUrl} alt={`Demostración de ${exercise.title}`} isLoading={imageLoading} error={imageError} />
              ) : null}

              <section aria-labelledby={`instructions-${exercise.id}`}>
                <h3 id={`instructions-${exercise.id}`} className="text-xs font-black tracking-widest text-muted uppercase">Cómo hacerlo</h3>
                <p className="mt-2 text-pretty leading-7 text-foreground">{exercise.description}</p>
              </section>

              {exercise.notes ? (
                <Alert status="warning">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Ten en cuenta</Alert.Title>
                    <Alert.Description>{exercise.notes}</Alert.Description>
                  </Alert.Content>
                </Alert>
              ) : null}

              <Card variant="secondary">
                <Card.Header>
                  <Card.Title className="text-sm">Por qué hacerlo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm leading-6 text-muted">{exercise.benefit}</p>
                </Card.Content>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={favorite ? "danger" : "secondary"} onPress={() => toggleFavorite(exercise.id)}>
              <HeartIcon filled={favorite} className="size-4" />
              {favorite ? "Quitar favorito" : "Guardar favorito"}
            </Button>
            <Button slot="close">Cerrar</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
