"use client"

import { useMemo, useState } from "react"
import { ProductGrid } from "@/components/catalog/product-grid"
import type { Product } from "@/lib/products"
import { groupVariants } from "@/lib/catalog"

const INITIAL_VISIBLE = 10
const STEP = 10

export function CatalogSection({
  title,
  products,
}: {
  title: string
  products: Product[]
}) {
  const [visible, setVisible] = useState(INITIAL_VISIBLE)
  // Las presentaciones de un mismo producto comparten tarjeta: se pagina por tarjeta.
  const groups = useMemo(() => groupVariants(products), [products])

  if (products.length === 0) return null

  const shown = groups.slice(0, visible)
  const remaining = groups.length - visible
  const expanded = visible > INITIAL_VISIBLE

  return (
    <section className="mb-12 scroll-mt-32">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">
          {title}{" "}
          <span className="text-sm font-bold text-muted-foreground align-middle">
            ({products.length})
          </span>
        </h2>
        <div className="w-16 h-1 bg-secondary mt-2" />
      </div>

      <ProductGrid groups={shown} />

      {(remaining > 0 || expanded) && (
        <div className="flex justify-center items-center gap-3 mt-6">
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + STEP)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border border-primary text-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Ver más ({remaining})
            </button>
          )}
          {expanded && (
            <button
              type="button"
              onClick={() => setVisible(INITIAL_VISIBLE)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver menos
            </button>
          )}
        </div>
      )}
    </section>
  )
}
