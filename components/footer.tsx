import { Leaf, Instagram, Phone, MapPin, Facebook } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-brand text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center overflow-hidden rounded-md">
                <img src="/images/logo.jpeg" alt="El Grow de Aixa" className="h-full w-full object-cover" />
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
              <a
                href="https://www.facebook.com/profile.php?id=61577892680602&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/catalogo?cat=sustratos" className="text-white/70 hover:text-white transition-colors">
                  Sustratos y Enmiendas
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=fertilizantes" className="text-white/70 hover:text-white transition-colors">
                  Fertilizantes
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=control-plagas" className="text-white/70 hover:text-white transition-colors">
                  Control de Plagas
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=macetas" className="text-white/70 hover:text-white transition-colors">
                  Macetas
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=accesorios" className="text-white/70 hover:text-white transition-colors">
                  Accesorios
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
                <span className="text-white/70">Roca y esquina Moreno, Concepción - Tucumán</span>
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
