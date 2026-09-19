// Helpers derivados del catálogo (marcas, subcategorías, sugerencias).
// Se mantienen aparte de lib/products.ts porque ese archivo es autogenerado
// por scripts/generate-products.py y se sobrescribe al regenerar.

import {
  PRODUCTS,
  searchProducts,
  type CategoryId,
  type Product,
} from "@/lib/products"

/** Marcas únicas presentes, opcionalmente acotadas a una categoría. Orden alfabético (es). */
export function getBrands(category?: CategoryId): string[] {
  const src = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS
  const seen = new Set<string>()
  for (const p of src) {
    if (p.brand) seen.add(p.brand)
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b, "es"))
}

/** Subcategorías únicas presentes, opcionalmente acotadas a una categoría. Preserva orden de aparición. */
export function getSubcategories(category?: CategoryId): string[] {
  const src = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of src) {
    if (p.subcategory && !seen.has(p.subcategory)) {
      seen.add(p.subcategory)
      out.push(p.subcategory)
    }
  }
  return out
}

/** Productos que coinciden con el texto, limitados para el panel de sugerencias. */
export function searchProductSuggestions(query: string, limit = 8): Product[] {
  return searchProducts(query, PRODUCTS).slice(0, limit)
}

/** Porcentaje de descuento redondeado, o null si el producto no tiene una oferta válida. */
export function getDiscountPercent(product: Product): number | null {
  if (!product.onSale || product.price == null || product.salePrice == null) return null
  if (product.salePrice >= product.price) return null
  return Math.round((1 - product.salePrice / product.price) * 100)
}

/** Oferta con stock, foto y mayor descuento: la que se destaca en el hero de la home. */
export function getFeaturedOffer(): Product | null {
  let best: Product | null = null
  let bestPct = 0
  for (const p of PRODUCTS) {
    const pct = getDiscountPercent(p)
    if (pct == null || !p.inStock || !p.image) continue
    if (pct > bestPct) {
      best = p
      bestPct = pct
    }
  }
  return best
}

// --- Variantes por tamaño ---------------------------------------------------
// La planilla lista cada presentación como producto aparte ("Humus de Lombriz x 5 dm",
// "... x 25 dm"). Acá se agrupan por nombre base para mostrarlas como una sola
// tarjeta con selector de tamaño. El patrón es conservador: lo que no matchea
// queda como producto individual.

const VARIANT_PATTERN =
  /^(.*?)\s+[xX]\s*([\d.,]+\s*(?:dm|cc|ml|ltrs?|lts?|grs?|kilos?|kg)\b)(.*)$/

export interface ProductGroup {
  /** Clave estable de la familia (categoría + marca + nombre base). */
  key: string
  /** Nombre sin el tamaño; para productos sin variantes es el nombre completo. */
  baseName: string
  variants: Product[]
}

/** Separa "Oro Negro x 100 ml (Vegetativo)" en base "Oro Negro" y tamaño "100 ml". */
export function parseVariant(name: string): { base: string; size: string } | null {
  const m = VARIANT_PATTERN.exec(name)
  if (!m) return null
  return { base: m[1].trim(), size: m[2].replace(/\s+/g, " ").trim() }
}

function familyKey(product: Product): string | null {
  const parsed = parseVariant(product.name)
  if (!parsed) return null
  return `${product.category}|${product.brand ?? ""}|${parsed.base.toLowerCase()}`
}

/** Etiqueta corta del tamaño para el selector; cae al nombre si no hay patrón. */
export function getVariantLabel(product: Product): string {
  return parseVariant(product.name)?.size ?? product.name
}

/** Agrupa presentaciones de un mismo producto, preservando el orden de aparición. */
export function groupVariants(products: Product[]): ProductGroup[] {
  const groups: ProductGroup[] = []
  const byKey = new Map<string, ProductGroup>()
  for (const p of products) {
    const key = familyKey(p)
    const existing = key ? byKey.get(key) : undefined
    if (existing) {
      existing.variants.push(p)
      continue
    }
    const group: ProductGroup = { key: key ?? p.id, baseName: p.name, variants: [p] }
    groups.push(group)
    if (key) byKey.set(key, group)
  }
  for (const g of groups) {
    if (g.variants.length > 1) g.baseName = parseVariant(g.variants[0].name)?.base ?? g.baseName
  }
  return groups
}

/** Otras presentaciones del mismo producto en todo el catálogo (incluye al propio). */
export function getSiblingVariants(product: Product): Product[] {
  const key = familyKey(product)
  if (!key) return [product]
  return PRODUCTS.filter((p) => familyKey(p) === key)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

/** Relacionados: misma subcategoría o marca primero, con stock, sin repetir la familia. */
export function getRelatedProducts(product: Product, limit = 5): Product[] {
  const ownKey = familyKey(product) ?? product.id
  const seen = new Set<string>([ownKey])
  const score = (p: Product) =>
    Number(!!product.subcategory && p.subcategory === product.subcategory) * 2 +
    Number(!!product.brand && p.brand === product.brand)
  const candidates = PRODUCTS.filter((p) => p.category === product.category && p.inStock && p.id !== product.id)
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
  const out: Product[] = []
  for (const { p } of candidates) {
    const key = familyKey(p) ?? p.id
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
    if (out.length === limit) break
  }
  return out
}
