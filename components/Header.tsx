"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { formatDate } from "@/lib/utils";
import { getSectionNavLinks } from "@/lib/section-metadata";

const navLinks = getSectionNavLinks();

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const today = formatDate(new Date().toISOString());

  return (
    <header className="border-b border-gray-300 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="hidden md:flex items-center justify-between text-xs tracking-wide uppercase border-b border-gray-300 pb-3">
          <div className="flex items-center gap-2 text-black">
            <span>Quiénes somos</span>
            <span className="text-gray-400">·</span>
            <span>Contacto</span>
          </div>
          <time dateTime={new Date().toISOString()}>{today}</time>
        </div>

        <div className="flex justify-between items-center py-5">
          <div className="md:hidden" />
          <div className="flex-1 text-center">
            <Link
              href="/"
              className="font-serif text-5xl md:text-7xl font-bold leading-none tracking-tight text-black"
            >
              LIBERTAD
            </Link>
            <p className="mt-3 text-[11px] sm:text-xs md:text-sm tracking-wide uppercase text-black">
              PERIÓDICO DE CRITERIO, MEMORIA Y CULTURA CÍVICA
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md border border-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <nav
          className="hidden md:flex items-center justify-between border-t border-b border-gray-300 py-3"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm lg:text-base font-semibold text-black hover:text-blue-900 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
