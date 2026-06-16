"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "@/lib/products"

export interface CartItem {
  id: string
  name: string
  price: number | null // precio unitario efectivo (oferta si aplica); null = a consultar
  image?: string
  qty: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  hasConsultar: boolean
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
  setOpen: (open: boolean) => void
}

const STORAGE_KEY = "aixa-cart"
const CartContext = createContext<CartContextValue | null>(null)

function effectivePrice(product: Product): number | null {
  if (product.onSale && product.salePrice != null) return product.salePrice
  return product.price
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Cargar desde localStorage al montar (evita mismatch de hidratación).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      /* ignore */
    }
    setLoaded(true)
  }, [])

  // Persistir (solo después de cargar, para no pisar el storage con []).
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items, loaded])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: effectivePrice(product),
          image: product.image,
          qty: 1,
        },
      ]
    })
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )

  const increment = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))

  const decrement = (id: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    )

  const clear = () => setItems([])

  const { count, total, hasConsultar } = useMemo(() => {
    let count = 0
    let total = 0
    let hasConsultar = false
    for (const i of items) {
      count += i.qty
      if (i.price == null) hasConsultar = true
      else total += i.price * i.qty
    }
    return { count, total, hasConsultar }
  }, [items])

  const value: CartContextValue = {
    items,
    count,
    total,
    hasConsultar,
    isOpen,
    addItem,
    removeItem,
    setQty,
    increment,
    decrement,
    clear,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    setOpen: setIsOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>")
  return ctx
}
