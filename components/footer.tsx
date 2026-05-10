import { Leaf, Instagram, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-brand text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold block">El Grow de Aixa</span>
                <span className="text-sm text-white/60">Todo para tu cultivo</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Tu tienda de confianza para productos de cultivo de alta calidad. Asesoramiento experto y atención personalizada en Concepción, Tucumán.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/elgrowdeaixa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5493865718714"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#categorias" className="text-white/70 hover:text-white transition-colors">
                  Sustratos y Tierra
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="text-white/70 hover:text-white transition-colors">
                  Semillas y Genética
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="text-white/70 hover:text-white transition-colors">
                  Iluminación
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="text-white/70 hover:text-white transition-colors">
                  Nutrientes
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="text-white/70 hover:text-white transition-colors">
                  Sistemas de Riego
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Concepción, Tucumán</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/5493865718714"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  386-5-718-714
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="https://instagram.com/elgrowdeaixa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  @elgrowdeaixa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} El Grow de Aixa. Todos los derechos reservados.
          </p>
          <p className="text-white/50 text-sm">
            Hecho con 💖 en Tucumán
          </p>
        </div>
      </div>
    </footer>
  )
}
