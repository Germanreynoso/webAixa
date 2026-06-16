import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

// Productos en oferta, priorizando los que tienen stock. Datos reales del catálogo.
const offers = PRODUCTS.filter((p) => p.onSale)
  .sort((a, b) => Number(b.inStock) - Number(a.inStock))
  .slice(0, 10)

export function FeaturedOffers() {
  if (offers.length === 0) return null

  return (
    <section id="ofertas" className="relative py-12 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
            NUESTRAS <span className="text-primary">OFERTAS</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Descuentos vigentes — consultá disponibilidad por WhatsApp
          </p>
          <div className="w-20 h-1 bg-secondary mt-3" />
        </div>

        {/* Offers grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
