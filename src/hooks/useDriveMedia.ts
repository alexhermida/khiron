import { useEffect, useRef, useState } from "react";

export interface DriveMediaState {
  blobUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

interface RequestState extends DriveMediaState {
  key: string | null;
}

const EMPTY_STATE: DriveMediaState = {
  blobUrl: null,
  isLoading: false,
  error: null,
};

function getErrorMessage(status: number, mediaLabel: string) {
  if (status === 401) return "Sesión expirada. Inicia sesión de nuevo.";
  if (status === 403) return `No tienes permisos para ver ${mediaLabel}.`;
  if (status === 404) {
    const capitalized = mediaLabel.charAt(0).toUpperCase() + mediaLabel.slice(1);
    return `${capitalized} no encontrado en Drive.`;
  }
  return `No se pudo cargar ${mediaLabel} (error ${status}).`;
}

export function useDriveMedia(
  fileId: string | undefined,
  accessToken: string | null,
  mediaLabel: "el vídeo" | "esta imagen"
): DriveMediaState {
  const requestKey = fileId && accessToken ? `${fileId}:${accessToken}` : null;
  const [state, setState] = useState<RequestState>({
    ...EMPTY_STATE,
    key: null,
  });
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!fileId || !accessToken || !requestKey) return;

    let cancelled = false;

    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error(getErrorMessage(response.status, mediaLabel));
        return response.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        setState({ key: requestKey, blobUrl, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState({
          key: requestKey,
          blobUrl: null,
          isLoading: false,
          error: error instanceof Error ? error.message : `No se pudo cargar ${mediaLabel}.`,
        });
      });

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [accessToken, fileId, mediaLabel, requestKey]);

  if (!requestKey) return EMPTY_STATE;
  if (state.key !== requestKey) {
    return { blobUrl: null, isLoading: true, error: null };
  }
  return state;
}
