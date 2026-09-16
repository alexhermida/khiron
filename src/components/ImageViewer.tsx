import { Alert, Skeleton } from "@heroui/react";

interface ImageViewerProps {
  src: string | null;
  alt: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function ImageViewer({ src, alt, isLoading, error }: ImageViewerProps) {
  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Cargando imagen…">
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>No se pudo cargar la imagen</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  if (!src) return null;

  return (
    <div className="overflow-hidden rounded-2xl bg-surface-secondary">
      <img src={src} alt={alt} width="1200" height="900" className="h-auto w-full object-contain" />
    </div>
  );
}
