"use client"

import { Search, User, Heart, ShoppingCart, Leaf, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"

const NAV_LINKS = [
  { label: "SUSTRATOS", href: "/catalogo?cat=sustratos" },
  { label: "FERTILIZANTES", href: "/catalogo?cat=fertilizantes" },
  { label: "CONTROL DE PLAGAS", href: "/catalogo?cat=control-plagas" },
  { label: "MACETAS", href: "/catalogo?cat=macetas" },
  { label: "ACCESORIOS", href: "/catalogo?cat=accesorios" },
]

export function ECommerceHeader() {
  const router = useRouter()
  const { count, openCart } = useCart()
  const [search, setSearch] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = search.trim()
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo")
  }

  return (
    <header className="w-full bg-transparent text-foreground border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      {/* Top Bar: Logo, Search, User Tools */}
      <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 scale-90 sm:scale-100">
          <div className="relative h-12 w-auto sm:h-16 flex items-center justify-center overflow-hidden rounded-md">
            <img src="/images/logo.jpeg" alt="El Grow de Aixa" className="h-full w-auto object-cover drop-shadow-md" />
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-2xl relative">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-card border-border h-11 pr-12 focus-visible:ring-primary/30 text-foreground"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-r-md cursor-pointer hover:bg-accent transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/catalogo" aria-label="Buscar" className="md:hidden text-foreground hover:text-primary transition-colors">
            <Search className="h-6 w-6" />
          </Link>
          <Link href="/perfil" className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors">
            <User className="h-6 w-6" />
          </Link>
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
          <button className="lg:hidden text-foreground">
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
            <Link href="/catalogo?ofertas=1" className="px-4 h-full flex items-center text-sm font-bold text-primary hover:bg-black/10 whitespace-nowrap">
              OFERTAS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
