import { useEffect, useRef } from "react";
import { Alert, Skeleton } from "@heroui/react";

interface VideoPlayerProps {
  src: string | null;
  isVisible: boolean;
  isLoading?: boolean;
  error?: string | null;
  title?: string;
}

export default function VideoPlayer({ src, isVisible, isLoading, error, title = "Demostración del ejercicio" }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVisible && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [isVisible]);

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Cargando vídeo…">
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>No se pudo cargar el vídeo</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  if (!src) return null;

  return (
    <video
      ref={ref}
      src={src}
      title={title}
      controls
      playsInline
      preload="metadata"
      className="aspect-video w-full rounded-2xl bg-black object-contain"
    />
  );
}
