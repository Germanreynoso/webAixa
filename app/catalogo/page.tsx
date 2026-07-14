import type { Metadata } from "next"
import { ECommerceHeader } from "@/components/ecommerce-header"
import { Footer } from "@/components/footer"
import { CatalogClient } from "@/components/catalog/catalog-client"
import { CATEGORIES, type CategoryId } from "@/lib/products"
import { getBrands, getSubcategories } from "@/lib/catalog"
import { ALL, type FilterCategory } from "@/components/catalog/catalog-filters"

export const metadata: Metadata = {
  title: "Catálogo | El Grow de Aixa",
  description:
    "Catálogo completo de El Grow de Aixa: sustratos y enmiendas, fertilizantes, control de plagas, macetas y accesorios. Consultá precios y disponibilidad por WhatsApp.",
}

type ParamValue = string | string[] | undefined
type SearchParams = Promise<{
  cat?: ParamValue
  q?: ParamValue
  marca?: ParamValue
  sub?: ParamValue
  ofertas?: ParamValue
  stock?: ParamValue
}>

/** Un param repetido (?q=a&q=b) llega como array; nos quedamos con el primer valor. */
function first(v: ParamValue): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  const cat = first(sp.cat)
  const marca = first(sp.marca)
  const sub = first(sp.sub)
  const ofertas = first(sp.ofertas)
  const stock = first(sp.stock)

  const validCategory = CATEGORIES.find((c) => c.id === cat)?.id as CategoryId | undefined
  const initialCategory: FilterCategory = validCategory ?? "all"
  const initialQuery = first(sp.q) ?? ""

  // Validar marca / subcategoría contra las opciones reales (acotadas por categoría si aplica).
  const validBrands = getBrands(validCategory)
  const initialBrand = marca && validBrands.includes(marca) ? marca : ALL
  const validSubs = getSubcategories(validCategory)
  const initialSubcategory = sub && validSubs.includes(sub) ? sub : ALL

  const initialOffersOnly = ofertas === "1" || ofertas === "true"
  const initialInStockOnly = stock === "1" || stock === "true"

  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />
      <div className="pb-16">
        {/* Catalog hero */}
        <section className="max-w-[1400px] mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
            Nuestro <span className="text-primary">Catálogo</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
            Sustratos, fertilizantes, control de plagas, macetas y accesorios. Consultá
            disponibilidad y precios por WhatsApp.
          </p>
        </section>

        <div className="max-w-[1400px] mx-auto px-4">
          <CatalogClient
            initialCategory={initialCategory}
            initialQuery={initialQuery}
            initialBrand={initialBrand}
            initialSubcategory={initialSubcategory}
            initialOffersOnly={initialOffersOnly}
            initialInStockOnly={initialInStockOnly}
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
