"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CATEGORIES,
  PRODUCTS,
  getProductsByCategory,
  searchProducts,
  type CategoryId,
  type Product,
} from "@/lib/products"
import { CatalogFilters, type FilterCategory } from "@/components/catalog/catalog-filters"
import { CatalogSection } from "@/components/catalog/catalog-section"
import { ProductGrid } from "@/components/catalog/product-grid"

interface CatalogClientProps {
  initialCategory?: FilterCategory
  initialQuery?: string
  initialOffersOnly?: boolean
}

export function CatalogClient({
  initialCategory = "all",
  initialQuery = "",
  initialOffersOnly = false,
}: CatalogClientProps) {
  const router = useRouter()
  const [category, setCategory] = useState<FilterCategory>(initialCategory)
  const [query, setQuery] = useState(initialQuery)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [offersOnly, setOffersOnly] = useState(initialOffersOnly)

  const filtered = useMemo(() => {
    let list = category === "all" ? PRODUCTS : getProductsByCategory(category)
    if (query.trim()) list = searchProducts(query, list)
    if (inStockOnly) list = list.filter((p) => p.inStock)
    if (offersOnly) list = list.filter((p) => p.onSale)
    return list
  }, [category, query, inStockOnly, offersOnly])

  const handleCategoryChange = useCallback(
    (next: FilterCategory) => {
      setCategory(next)
      const params = new URLSearchParams()
      if (next !== "all") params.set("cat", next)
      if (offersOnly) params.set("ofertas", "1")
      const qs = params.toString()
      router.replace(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false })
    },
    [router, offersOnly],
  )

  // Signature that resets per-section "ver más" state when filters change.
  const filterKey = `${query}|${inStockOnly}|${offersOnly}`

  // Single category -> group by subcategory (or brand) preserving source order.
  const groups = useMemo(() => {
    if (category === "all") return []
    const map = new Map<string, Product[]>()
    for (const p of filtered) {
      const key = p.subcategory || p.brand || "Otros"
      const bucket = map.get(key)
      if (bucket) bucket.push(p)
      else map.set(key, [p])
    }
    return Array.from(map.entries())
  }, [category, filtered])

  return (
    <>
      <CatalogFilters
        categories={CATEGORIES}
        category={category}
        onCategoryChange={handleCategoryChange}
        query={query}
        onQueryChange={setQuery}
        inStockOnly={inStockOnly}
        onInStockToggle={setInStockOnly}
        offersOnly={offersOnly}
        onOffersToggle={setOffersOnly}
        total={filtered.length}
      />

      {filtered.length === 0 ? (
        <ProductGrid products={[]} />
      ) : category === "all" ? (
        CATEGORIES.map((cat) => (
          <CatalogSection
            key={`${cat.id}-${filterKey}`}
            title={cat.label}
            products={filtered.filter((p) => p.category === (cat.id as CategoryId))}
          />
        ))
      ) : (
        groups.map(([key, products]) => (
          <CatalogSection key={`${key}-${filterKey}`} title={key} products={products} />
        ))
      )}
    </>
  )
}
