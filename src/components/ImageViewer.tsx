interface ImageViewerProps {
  src: string | null;
  alt: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function ImageViewer({
  src,
  alt,
  isLoading,
  error,
}: ImageViewerProps) {
  if (isLoading) {
    return (
      <div className="w-full rounded-xl bg-gray-100 flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-gray-500">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-sm">Cargando imagen...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl bg-red-50 border border-red-200 flex items-center justify-center py-8 px-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!src) return null;

  return <img src={src} alt={alt} className="w-full rounded-xl" />;
}
