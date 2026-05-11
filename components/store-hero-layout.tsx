"use client"

import { ChevronRight, Leaf, ShieldCheck, Zap, FlaskConical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Semillas", icon: ChevronRight },
  { name: "Iluminación", icon: ChevronRight },
  { name: "Carpas", icon: ChevronRight },
  { name: "Nutrientes", icon: ChevronRight },
  { name: "Ventilación", icon: ChevronRight },
  { name: "Accesorios", icon: ChevronRight },
  { name: "Ofertas", icon: ChevronRight },
]

export function StoreHeroLayout() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-4">
      <div className="flex gap-4">
        {/* Vertical Sidebar */}
        <div className="hidden lg:block w-[260px] flex-shrink-0 bg-card border border-border shadow-sm rounded-sm">
          <ul className="py-2">
            {categories.map((cat, i) => (
              <li key={i} className="border-b border-border last:border-0">
                <Link 
                  href={`/${cat.name.toLowerCase()}`} 
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold text-foreground/80 hover:text-primary transition-colors group"
                >
                  {cat.name}
                  <cat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Banner Area */}
        <div className="flex-grow flex flex-col gap-4">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full bg-gray-900 rounded-sm overflow-hidden group">
            {/* Background Image Placeholder (using a gradient for now, can be replaced by an image) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 gradient-hero-vibrant opacity-80" />
            
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 max-w-2xl">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-4 tracking-tighter uppercase leading-none">
                ¡CULTIVA TU <span className="text-primary">PROPIO MUNDO!</span>
              </h2>
              <p className="text-sm sm:text-lg text-white/90 mb-4 sm:mb-8 font-medium">
                Equipamiento Premium para Cultivo de Interior y Exterior - Ver Ofertas Especiales
              </p>
              
              {/* Pagination Dots (Visual only) */}
              <div className="flex gap-2 mt-auto pb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Decorative Image (Optional placeholder) */}
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
               {/* This would be a high quality image of plants */}
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-card p-3 sm:p-4 border border-border shadow-sm flex items-center gap-3 sm:gap-4 rounded-sm hover:border-primary transition-colors cursor-pointer group">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-colors">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground">Semillas Feminizadas</span>
            </div>
            <div className="bg-card p-3 sm:p-4 border border-border shadow-sm flex items-center gap-3 sm:gap-4 rounded-sm hover:border-primary transition-colors cursor-pointer group">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-colors">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground">Kits de Cultivo</span>
            </div>
            <div className="bg-card p-3 sm:p-4 border border-border shadow-sm flex items-center gap-3 sm:gap-4 rounded-sm hover:border-primary transition-colors cursor-pointer group">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-colors">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground">Iluminación LED</span>
            </div>
            <div className="bg-card p-3 sm:p-4 border border-border shadow-sm flex items-center gap-3 sm:gap-4 rounded-sm hover:border-primary transition-colors cursor-pointer group">
              <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-colors">
                <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground">Nutrientes Orgánicos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
