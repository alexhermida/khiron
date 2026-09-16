import { useDriveMedia } from "./useDriveMedia";

export function useDriveVideo(
  driveFileId: string | undefined,
  accessToken: string | null
) {
  return useDriveMedia(driveFileId, accessToken, "el vídeo");
}
