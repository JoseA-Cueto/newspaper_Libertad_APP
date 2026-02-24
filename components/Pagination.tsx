import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
  pageSize?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
  pageSize,
  className = "",
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const buildUrl = (page: number) => {
    if (!baseUrl) return "";
    const pageSizeParam = pageSize ? `&pageSize=${pageSize}` : "";
    return `${baseUrl}${page}${pageSizeParam}`;
  };

  const handlePrev = () => {
    if (hasPrev && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  if (baseUrl) {
    return (
      <nav
        className={`flex items-center justify-center gap-4 py-8 ${className}`}
        aria-label="Pagination"
      >
        {hasPrev ? (
          <Link
            href={buildUrl(currentPage - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            &larr; Anterior
          </Link>
        ) : (
          <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
            &larr; Anterior
          </span>
        )}

        <span className="text-sm text-gray-700 font-medium">
          Página {currentPage} de {totalPages}
        </span>

        {hasNext ? (
          <Link
            href={buildUrl(currentPage + 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Siguiente &rarr;
          </Link>
        ) : (
          <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
            Siguiente &rarr;
          </span>
        )}
      </nav>
    );
  }

  return (
    <nav
      className={`flex items-center justify-center gap-4 py-8 ${className}`}
      aria-label="Pagination"
    >
      <button
        onClick={handlePrev}
        disabled={!hasPrev}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        &larr; Anterior
      </button>

      <span className="text-sm text-gray-700 font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={!hasNext}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        aria-label="Página siguiente"
      >
        Siguiente &rarr;
      </button>
    </nav>
  );
}
