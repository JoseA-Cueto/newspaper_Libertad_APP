"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">LIBERTAD</h3>
            <p className="text-sm">
              Periódico digital independiente con enfoque text-first, 
              comprometido con la información clara y verificada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/historico" className="hover:text-white transition">
                  Histórico
                </Link>
              </li>
              <li>
                <Link href="/colabora" className="hover:text-white transition">
                  Colabora
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aviso-legal" className="hover:text-white transition">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-white transition">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/normas-colaboracion" className="hover:text-white transition">
                  Normas de colaboración
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            © {currentYear} LIBERTAD. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
