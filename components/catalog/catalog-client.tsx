"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CATEGORIES,
  PRODUCTS,
  getProductsByCategory,
  searchProducts,
  type CategoryId,
  type Product,
} from "@/lib/products"
import { getBrands, getSubcategories } from "@/lib/catalog"
import { ALL, CatalogFilters, type FilterCategory } from "@/components/catalog/catalog-filters"
import { CatalogSection } from "@/components/catalog/catalog-section"
import { ProductGrid } from "@/components/catalog/product-grid"

interface CatalogClientProps {
  initialCategory?: FilterCategory
  initialQuery?: string
  initialBrand?: string
  initialSubcategory?: string
  initialOffersOnly?: boolean
  initialInStockOnly?: boolean
}

export function CatalogClient({
  initialCategory = "all",
  initialQuery = "",
  initialBrand = ALL,
  initialSubcategory = ALL,
  initialOffersOnly = false,
  initialInStockOnly = false,
}: CatalogClientProps) {
  const router = useRouter()
  const [category, setCategory] = useState<FilterCategory>(initialCategory)
  const [query, setQuery] = useState(initialQuery)
  const [brand, setBrand] = useState(initialBrand)
  const [subcategory, setSubcategory] = useState(initialSubcategory)
  const [inStockOnly, setInStockOnly] = useState(initialInStockOnly)
  const [offersOnly, setOffersOnly] = useState(initialOffersOnly)

  // Opciones de marca / subcategoría dependientes de la categoría activa.
  const brandOptions = useMemo(
    () => (category === "all" ? getBrands() : getBrands(category)),
    [category],
  )
  const subcategoryOptions = useMemo(
    () => (category === "all" ? getSubcategories() : getSubcategories(category)),
    [category],
  )

  const filtered = useMemo(() => {
    let list = category === "all" ? PRODUCTS : getProductsByCategory(category)
    if (brand !== ALL) list = list.filter((p) => p.brand === brand)
    if (subcategory !== ALL) list = list.filter((p) => p.subcategory === subcategory)
    if (query.trim()) list = searchProducts(query, list)
    if (inStockOnly) list = list.filter((p) => p.inStock)
    if (offersOnly) list = list.filter((p) => p.onSale)
    return list
  }, [category, brand, subcategory, query, inStockOnly, offersOnly])

  const handleCategoryChange = useCallback((next: FilterCategory) => setCategory(next), [])

  // Sanear marca / subcategoría si dejan de existir en la categoría activa.
  // Independiente del origen del cambio (chip in-page, URL, o carrera del debounce):
  // evita quedar con un filtro inválido y el grid vacío sin recuperación.
  useEffect(() => {
    if (brand !== ALL && !brandOptions.includes(brand)) setBrand(ALL)
  }, [brandOptions, brand])
  useEffect(() => {
    if (subcategory !== ALL && !subcategoryOptions.includes(subcategory)) setSubcategory(ALL)
  }, [subcategoryOptions, subcategory])

  // --- Sincronización URL <-> estado ---------------------------------------
  // Guarda del último texto empujado a la URL, para distinguir el "eco" de la
  // propia navegación de un cambio externo (?q= desde el buscador del header).
  const lastSyncedQuery = useRef(initialQuery.trim())

  // estado -> URL (links compartibles), con debounce para no ensuciar el historial.
  useEffect(() => {
    const params = new URLSearchParams()
    if (category !== "all") params.set("cat", category)
    if (brand !== ALL) params.set("marca", brand)
    if (subcategory !== ALL) params.set("sub", subcategory)
    if (query.trim()) params.set("q", query.trim())
    if (offersOnly) params.set("ofertas", "1")
    if (inStockOnly) params.set("stock", "1")
    const qs = params.toString()
    // Evitar un replace redundante si la URL ya coincide (p. ej. en el mount).
    if (qs === window.location.search.replace(/^\?/, "")) {
      lastSyncedQuery.current = query.trim()
      return
    }
    const t = setTimeout(() => {
      lastSyncedQuery.current = query.trim()
      // Revalidar: si la URL ya cambió (p. ej. Back del navegador) y coincide con
      // el objetivo, no re-empujar un replace redundante.
      if (qs === window.location.search.replace(/^\?/, "")) return
      router.replace(qs ? `/catalogo?${qs}` : "/catalogo", { scroll: false })
    }, 250)
    return () => clearTimeout(t)
  }, [category, brand, subcategory, query, offersOnly, inStockOnly, router])

  // URL -> estado: reflejar navegación externa (header / chips / links) sin
  // remontar. setState con el mismo valor hace bailout, así que no hay loop.
  useEffect(() => setCategory(initialCategory), [initialCategory])
  useEffect(() => setBrand(initialBrand), [initialBrand])
  useEffect(() => setSubcategory(initialSubcategory), [initialSubcategory])
  useEffect(() => setOffersOnly(initialOffersOnly), [initialOffersOnly])
  useEffect(() => setInStockOnly(initialInStockOnly), [initialInStockOnly])
  // El texto necesita la guarda para no pisar lo que el usuario está tipeando.
  useEffect(() => {
    const incoming = initialQuery.trim()
    if (incoming !== lastSyncedQuery.current) {
      lastSyncedQuery.current = incoming
      setQuery(initialQuery)
    }
  }, [initialQuery])

  // Firma que reinicia el estado "ver más" por sección cuando cambian los filtros.
  const filterKey = `${query}|${brand}|${subcategory}|${inStockOnly}|${offersOnly}`

  // Categoría única -> agrupar por subcategoría (o marca) preservando el orden de origen.
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
        brands={brandOptions}
        brand={brand}
        onBrandChange={setBrand}
        subcategories={subcategoryOptions}
        subcategory={subcategory}
        onSubcategoryChange={setSubcategory}
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
