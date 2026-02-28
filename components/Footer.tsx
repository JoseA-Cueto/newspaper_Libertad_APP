"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black py-10 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-black font-bold mb-4">LIBERTAD</h3>
            <p className="text-sm">
              Periódico digital independiente con enfoque text-first, 
              comprometido con la información clara y verificada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-black font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/historico" className="hover:text-blue-900 transition">
                  Histórico
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-300 pt-8">
          <p className="text-center text-sm">
            © {currentYear} LIBERTAD. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
