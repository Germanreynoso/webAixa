"use client"

import { Search, User, Heart, ShoppingCart, Leaf, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ECommerceHeader() {
  return (
    <header className="w-full bg-white text-gray-800">
      {/* Top Bar: Logo, Search, User Tools */}
      <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black text-gray-900 tracking-tighter">EL GROW</span>
            <span className="text-sm font-bold text-primary tracking-widest">DE AIXA</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl relative">
          <Input 
            type="text" 
            placeholder="Buscar productos, carpas, luces..." 
            className="w-full bg-gray-100 border-none h-11 pr-12 focus-visible:ring-primary/30"
          />
          <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-primary text-white rounded-r-md cursor-pointer hover:bg-primary/90 transition-colors">
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link href="/perfil" className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors">
            <User className="h-6 w-6" />
          </Link>
          <Link href="/favoritos" className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors">
            <Heart className="h-6 w-6" />
          </Link>
          <Link href="/carrito" className="flex items-center gap-3 group">
            <div className="relative">
              <ShoppingCart className="h-7 w-7 group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-[10px] font-bold text-gray-400">Items - $0.00</span>
              <span className="text-xs font-bold">CARRITO</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar: Green background */}
      <div className="bg-secondary text-white">
        <div className="max-w-[1400px] mx-auto px-4 flex h-11 items-center">
          {/* Categories Toggle */}
          <div className="bg-secondary-dark/20 h-full px-6 flex items-center gap-3 cursor-pointer hover:bg-black/10 transition-colors uppercase font-bold text-sm">
            <Menu className="h-4 w-4" />
            CATEGORÍAS
          </div>

          {/* Main Menu */}
          <nav className="flex h-full items-center ml-4">
            <Link href="/" className="px-4 h-full flex items-center text-sm font-bold bg-white text-secondary hover:bg-white/90 transition-colors">
              INICIO
            </Link>
            <Link href="/semillas" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              SEMILLAS
            </Link>
            <Link href="/iluminacion" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              ILUMINACIÓN
            </Link>
            <Link href="/carpas" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              CARPAS
            </Link>
            <Link href="/nutrientes" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              NUTRIENTES
            </Link>
            <Link href="/ventilacion" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              VENTILACIÓN
            </Link>
            <Link href="/accesorios" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10 transition-colors">
              ACCESORIOS
            </Link>
            <Link href="/ofertas" className="px-4 h-full flex items-center text-sm font-bold text-primary hover:bg-black/10 transition-colors">
              OFERTAS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
