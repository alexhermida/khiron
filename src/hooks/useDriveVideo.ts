import { useState, useEffect, useRef } from "react";

interface DriveVideoState {
  blobUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useDriveVideo(
  driveFileId: string | undefined,
  accessToken: string | null
): DriveVideoState {
  const [state, setState] = useState<DriveVideoState>({
    blobUrl: null,
    isLoading: false,
    error: null,
  });
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!driveFileId || !accessToken) {
      setState({ blobUrl: null, isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ blobUrl: null, isLoading: true, error: null });

    fetch(
      `https://www.googleapis.com/drive/v3/files/${driveFileId}?alt=media`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401)
            throw new Error("Sesión expirada. Inicia sesión de nuevo.");
          if (res.status === 403)
            throw new Error("No tienes permisos para ver este vídeo.");
          if (res.status === 404)
            throw new Error("Vídeo no encontrado en Drive.");
          throw new Error(`Error ${res.status}`);
        }
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setState({ blobUrl: url, isLoading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          blobUrl: null,
          isLoading: false,
          error: err instanceof Error ? err.message : "Error al cargar el vídeo",
        });
      });

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [driveFileId, accessToken]);

  return state;
}
