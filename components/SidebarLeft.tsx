"use client";

interface SidebarSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
}

interface SidebarLeftProps {
  sections: SidebarSection[];
  className?: string;
}

export default function SidebarLeft({ sections, className = "" }: SidebarLeftProps) {
  return (
    <aside
      className={`hidden lg:block w-64 flex-shrink-0 ${className}`}
      aria-label="Sidebar navigation"
    >
      <div className="sticky top-20 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="border-l-2 border-gray-200 pl-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              {section.title}
            </h3>
            <nav className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href={item.href}
                  className={`block text-sm transition ${
                    item.isActive
                      ? "font-semibold text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
