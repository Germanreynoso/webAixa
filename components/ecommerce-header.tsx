"use client"

import { Search, User, Heart, ShoppingCart, Leaf, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ECommerceHeader() {
  return (
    <header className="w-full bg-transparent text-foreground border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      {/* Top Bar: Logo, Search, User Tools */}
      <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 scale-90 sm:scale-100">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-black text-foreground tracking-tighter">EL GROW</span>
            <span className="text-[10px] sm:text-sm font-bold text-primary tracking-widest uppercase">de Aixa</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow max-w-2xl relative">
          <Input 
            type="text" 
            placeholder="Buscar productos..." 
            className="w-full bg-card border-border h-11 pr-12 focus-visible:ring-primary/30 text-foreground"
          />
          <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-r-md cursor-pointer">
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="md:hidden text-foreground">
            <Search className="h-6 w-6" />
          </button>
          <Link href="/perfil" className="flex flex-col items-center gap-0.5 hover:text-primary transition-colors">
            <User className="h-6 w-6" />
          </Link>
          <Link href="/carrito" className="flex items-center gap-2 group">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </Link>
          <button className="lg:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
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

          {/* Main Menu - Only visible on desktop */}
          <nav className="hidden lg:flex h-full items-center ml-4 overflow-x-auto no-scrollbar">
            <Link href="/" className="px-4 h-full flex items-center text-sm font-bold bg-primary text-primary-foreground">
              INICIO
            </Link>
            <Link href="/semillas" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10">
              SEMILLAS
            </Link>
            <Link href="/iluminacion" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10">
              ILUMINACIÓN
            </Link>
            <Link href="/carpas" className="px-4 h-full flex items-center text-sm font-bold hover:bg-black/10">
              CARPAS
            </Link>
            <Link href="/ofertas" className="px-4 h-full flex items-center text-sm font-bold text-primary hover:bg-black/10">
              OFERTAS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
