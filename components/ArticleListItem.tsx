import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface ArticleListItemProps {
  title: string;
  sectionName?: string | null;
  sectionSlug?: string | null;
  publishedAt?: string | null;
  href: string;
  className?: string;
}

export default function ArticleListItem({
  title,
  sectionName,
  sectionSlug,
  publishedAt,
  href,
  className = "",
}: ArticleListItemProps) {
  return (
    <article className={`border-b border-gray-100 py-3 ${className}`}>
      <Link href={href} className="group block">
        <h3 className="text-base font-semibold text-gray-900 mb-1 leading-snug group-hover:text-blue-700 transition">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {sectionName && sectionSlug && (
            <>
              <span className="font-medium uppercase tracking-wide">
                {sectionName}
              </span>
              <span className="text-gray-300">•</span>
            </>
          )}
          {publishedAt && (
            <time dateTime={publishedAt} className="uppercase tracking-wide">
              {formatDate(publishedAt)}
            </time>
          )}
        </div>
      </Link>
    </article>
  );
}
