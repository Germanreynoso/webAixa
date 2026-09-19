"use client"

import { Search, ShoppingCart, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/components/cart/cart-provider"
import { SiteSearch } from "@/components/search/site-search"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const NAV_LINKS = [
  { label: "SUSTRATOS", href: "/catalogo?cat=sustratos" },
  { label: "FERTILIZANTES", href: "/catalogo?cat=fertilizantes" },
  { label: "CONTROL DE PLAGAS", href: "/catalogo?cat=control-plagas" },
  { label: "MACETAS", href: "/catalogo?cat=macetas" },
  { label: "ACCESORIOS", href: "/catalogo?cat=accesorios" },
]

export function ECommerceHeader() {
  const { count, openCart } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // null hasta montar en cliente, para evitar mismatch de hidratación.
  const [isMac, setIsMac] = useState<boolean | null>(null)

  useEffect(() => {
    setIsMac(/mac|iphone|ipad|ipod/i.test(navigator.userAgent))
  }, [])

  return (
    <header className="w-full bg-background/95 text-foreground border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
      {/* Top Bar: Logo, Search, User Tools */}
      <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 scale-90 sm:scale-100">
          <div className="relative h-12 w-auto sm:h-16 flex items-center justify-center overflow-hidden rounded-md">
            <img src="/images/logo.jpeg" alt="El Grow de Aixa" className="h-full w-auto object-cover drop-shadow-md" />
          </div>
        </Link>

        {/* Search trigger (opens command dialog) */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Buscar productos, marcas o categorías"
          className="hidden md:flex flex-grow max-w-2xl items-center gap-2 h-11 rounded-md border border-border bg-card px-3 text-left text-sm text-muted-foreground hover:border-primary/40 transition-colors"
        >
          <Search className="h-5 w-5 shrink-0" />
          <span className="flex-grow">Buscar productos, marcas o categorías...</span>
          {isMac !== null && (
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          )}
        </button>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 group-hover:text-primary transition-colors" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold h-4 min-w-4 px-1 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="lg:hidden text-foreground hover:text-primary transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Navigation Bar: Green background */}
      <div className="bg-secondary text-white">
        <div className="max-w-[1400px] mx-auto px-4 flex h-11 items-center">
          {/* Categories Toggle */}
          <Link
            href="/catalogo"
            className="bg-secondary-dark/20 h-full px-6 flex items-center gap-3 cursor-pointer hover:bg-black/10 transition-colors uppercase font-bold text-sm"
          >
            <Menu className="h-4 w-4" />
            CATEGORÍAS
          </Link>

          {/* Main Menu - Only visible on desktop */}
          <nav className="hidden lg:flex h-full items-center ml-4 overflow-x-auto no-scrollbar">
            <Link href="/" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 whitespace-nowrap">
              INICIO
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/catalogo?ofertas=1" className="px-2 h-full flex items-center whitespace-nowrap group">
              <span className="px-3 py-1 rounded-full bg-white text-secondary text-sm font-black group-hover:bg-white/90 transition-colors">
                OFERTAS
              </span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="bg-card border-border gap-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle className="text-sm font-black uppercase tracking-wide text-foreground">Menú</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col overflow-y-auto">
            {[{ label: "INICIO", href: "/" }, { label: "TODO EL CATÁLOGO", href: "/catalogo" }, ...NAV_LINKS].map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="px-5 py-4 text-sm font-bold text-foreground/90 border-b border-border hover:text-primary hover:bg-background/40 transition-colors"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link
                href="/catalogo?ofertas=1"
                className="px-5 py-4 text-sm font-black text-primary border-b border-border hover:bg-background/40 transition-colors"
              >
                OFERTAS
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>

      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
