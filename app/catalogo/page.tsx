import type { Metadata } from "next"
import { ECommerceHeader } from "@/components/ecommerce-header"
import { Footer } from "@/components/footer"
import { CatalogClient } from "@/components/catalog/catalog-client"
import { CATEGORIES, type CategoryId } from "@/lib/products"
import type { FilterCategory } from "@/components/catalog/catalog-filters"

export const metadata: Metadata = {
  title: "Catálogo | El Grow de Aixa",
  description:
    "Catálogo completo de El Grow de Aixa: sustratos y enmiendas, fertilizantes, control de plagas, macetas y accesorios. Consultá precios y disponibilidad por WhatsApp.",
}

type SearchParams = Promise<{ cat?: string; q?: string; ofertas?: string }>

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  const validCategory = CATEGORIES.find((c) => c.id === sp.cat)?.id as CategoryId | undefined
  const initialCategory: FilterCategory = validCategory ?? "all"
  const initialQuery = sp.q ?? ""
  const initialOffersOnly = sp.ofertas === "1" || sp.ofertas === "true"

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
            initialOffersOnly={initialOffersOnly}
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
