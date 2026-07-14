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
