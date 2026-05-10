"use client"

import { Leaf, Menu, X, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-white">El Grow de Aixa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#productos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Productos
            </Link>
            <Link href="#categorias" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Categorías
            </Link>
            <Link href="#nosotros" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Ver Catálogo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="#productos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Productos
              </Link>
              <Link
                href="#categorias"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Categorías
              </Link>
              <Link
                href="#nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Contacto
              </Link>
              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors mt-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Ver Catálogo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
