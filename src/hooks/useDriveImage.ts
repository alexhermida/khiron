import { useDriveMedia } from "./useDriveMedia";

export function useDriveImage(
  driveImageId: string | undefined,
  accessToken: string | null
) {
  return useDriveMedia(driveImageId, accessToken, "esta imagen");
}
