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
      className={`hidden lg:block w-full flex-shrink-0 ${className}`}
      aria-label="Sidebar navigation"
    >
      <div className="sticky top-8 space-y-6 border-r border-gray-300 pr-6">
        {sections.map((section, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-4">
            <h3 className="text-3xl font-semibold text-black mb-3">
              {section.title}
            </h3>
            <nav className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href={item.href}
                  className={`block text-sm transition ${
                    item.isActive
                      ? "font-semibold text-black"
                      : "text-black hover:text-blue-900"
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
