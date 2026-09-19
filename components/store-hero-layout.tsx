"use client"

import { Sprout, FlaskConical, Bug, Container } from "lucide-react"
import Link from "next/link"

const quickInfo = [
  { label: "Sustratos y Enmiendas", icon: Sprout, href: "/catalogo?cat=sustratos" },
  { label: "Fertilizantes", icon: FlaskConical, href: "/catalogo?cat=fertilizantes" },
  { label: "Control de Plagas", icon: Bug, href: "/catalogo?cat=control-plagas" },
  { label: "Macetas y Accesorios", icon: Container, href: "/catalogo?cat=macetas" },
]

export function StoreHeroLayout() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-4">
      <div className="flex gap-4">
        {/* Hero Banner Area */}
        <div className="flex-grow flex flex-col gap-4">
          <Link
            href="/catalogo"
            className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[3/1] w-full bg-black rounded-sm overflow-hidden group flex items-center justify-center"
          >
            {/* Fondo: la misma textura del logo, desenfocada, para evitar franjas negras */}
            <img
              src="/images/logo.jpeg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl brightness-[0.4] saturate-150"
            />
            <img
              src="/images/logo.jpeg"
              alt="El Grow de Aixa Hero"
              className="relative z-10 h-full w-auto aspect-square object-cover [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            />
          </Link>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickInfo.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-card p-3 sm:p-4 border border-border shadow-sm flex items-center gap-3 sm:gap-4 rounded-sm hover:border-primary transition-colors cursor-pointer group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary transition-colors">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-foreground">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
