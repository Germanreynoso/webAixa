import { Leaf, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Leaf className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4">
          <span className="block">El Grow</span>
          <span className="block">de Aixa</span>
        </h1>

        {/* Slogan */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-4 tracking-wide">
          &quot;Todo para tu cultivo&quot;
        </p>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/80 mb-10 leading-relaxed">
          Productos premium para tu cultivo de plantas. Sustratos, semillas, iluminación, nutrientes y todo lo que necesitas para crecer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#categorias"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-magenta hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
          >
            Explorar Productos
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
          >
            Contactanos
          </Link>
        </div>

        {/* Location Badge */}
        <div className="mt-12 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white/90">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Concepción | Tucumán
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
