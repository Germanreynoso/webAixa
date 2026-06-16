"use client"

import { useEffect, useRef, useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart/cart-provider"

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  if (!product.inStock) {
    return (
      <button
        type="button"
        disabled
        className="w-full py-2 text-[10px] font-bold uppercase flex items-center justify-center gap-2 bg-foreground/20 text-muted-foreground cursor-not-allowed"
      >
        Sin stock
      </button>
    )
  }

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1400)
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full py-2 text-white text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-2 ${
        added ? "bg-primary" : "bg-secondary hover:bg-primary"
      }`}
    >
      {added ? (
        <>
          <Check className="h-3 w-3" />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingCart className="h-3 w-3" />
          Agregar al carrito
        </>
      )}
    </button>
  )
}
