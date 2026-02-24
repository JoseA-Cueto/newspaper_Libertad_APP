import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface ArticleCardTextProps {
  title: string;
  subtitle?: string | null;
  sectionName?: string | null;
  sectionSlug?: string | null;
  publishedAt?: string | null;
  href: string;
  className?: string;
}

export default function ArticleCardText({
  title,
  subtitle,
  sectionName,
  sectionSlug,
  publishedAt,
  href,
  className = "",
}: ArticleCardTextProps) {
  return (
    <article
      className={`border-b border-gray-200 pb-6 hover:bg-gray-50 transition px-4 py-4 -mx-4 ${className}`}
    >
      {/* Meta Info */}
      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
        {sectionName && sectionSlug && (
          <>
            <Link
              href={`/seccion/${sectionSlug}`}
              className="font-semibold uppercase tracking-wide text-blue-700 hover:text-blue-900"
            >
              {sectionName}
            </Link>
            <span className="text-gray-400">•</span>
          </>
        )}
        {publishedAt && (
          <time dateTime={publishedAt} className="uppercase tracking-wide">
            {formatDate(publishedAt)}
          </time>
        )}
      </div>

      {/* Title */}
      <Link href={href} className="group">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-700 transition">
          {title}
        </h2>
      </Link>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </article>
  );
}
