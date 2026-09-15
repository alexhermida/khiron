import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDriveVideo } from "../hooks/useDriveVideo";

const mockRevokeObjectURL = vi.fn();
const mockCreateObjectURL = vi.fn(() => "blob:mock-url");

beforeEach(() => {
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useDriveVideo", () => {
  it("returns null state when no fileId", () => {
    const { result } = renderHook(() => useDriveVideo(undefined, "token"));
    expect(result.current.blobUrl).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns null state when no token", () => {
    const { result } = renderHook(() => useDriveVideo("file-id", null));
    expect(result.current.blobUrl).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches video and returns blob URL on success", async () => {
    const mockBlob = new Blob(["video"], { type: "video/mp4" });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      })
    );

    const { result } = renderHook(() => useDriveVideo("file-id", "token"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.blobUrl).toBe("blob:mock-url");
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/drive/v3/files/file-id?alt=media",
      { headers: { Authorization: "Bearer token" } }
    );
  });

  it("sets error on 401 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 })
    );

    const { result } = renderHook(() => useDriveVideo("file-id", "expired"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.blobUrl).toBeNull();
    expect(result.current.error).toContain("Sesión expirada");
  });

  it("sets error on 403 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403 })
    );

    const { result } = renderHook(() => useDriveVideo("file-id", "token"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain("permisos");
  });

  it("sets error on network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    const { result } = renderHook(() => useDriveVideo("file-id", "token"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
  });

  it("revokes blob URL on unmount", async () => {
    const mockBlob = new Blob(["video"], { type: "video/mp4" });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(mockBlob),
      })
    );

    const { result, unmount } = renderHook(() =>
      useDriveVideo("file-id", "token")
    );

    await waitFor(() => {
      expect(result.current.blobUrl).toBe("blob:mock-url");
    });

    unmount();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });
});
