interface PageSectionHeaderProps {
  title: string;
  description?: string | null;
  className?: string;
}

export default function PageSectionHeader({
  title,
  description,
  className = "",
}: PageSectionHeaderProps) {
  return (
    <header className={`border-b-2 border-gray-900 pb-6 mb-8 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
