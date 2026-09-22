import Link from "next/link"
import { getDiscountPercent, getFeaturedOffer } from "@/lib/catalog"
import { formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"

// Sale sola del catálogo: la oferta con stock, foto y mayor descuento.
const featured = getFeaturedOffer()
const featuredPct = featured ? getDiscountPercent(featured) : null

/** Oferta destacada como bloque propio, entre el hero y los beneficios. */
export function FeaturedOfferCard() {
  if (!featured) return null
  const href = `/producto/${featured.id}`

  return (
    <section aria-labelledby="oferta-destacada-title" className="max-w-[1400px] mx-auto px-4 pt-6 sm:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 bg-card border border-border rounded-sm p-4 sm:p-5">
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
          <Link
            href={href}
            aria-label={`Ver ${featured.name}`}
            className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-sm bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img src={featured.image} alt={featured.name} className="w-full h-full object-contain" />
          </Link>

          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <span id="oferta-destacada-title">Oferta destacada</span>
              {featuredPct != null && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-black">
                  -{featuredPct}%
                </span>
              )}
            </p>
            <h2 className="mt-1.5 text-base sm:text-xl font-bold leading-snug text-foreground line-clamp-2">
              <Link href={href} className="hover:text-primary transition-colors">
                {featured.name}
              </Link>
            </h2>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-foreground">
                {formatPrice(featured.salePrice as number)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(featured.price as number)}
              </span>
            </div>
          </div>
        </div>

        <div className="sm:w-60 shrink-0 flex flex-col gap-2">
          <div className="rounded-sm overflow-hidden [&>button]:py-3.5 [&>button]:text-xs">
            <AddToCartButton product={featured} />
          </div>
          <Link
            href={href}
            className="text-center text-xs font-bold text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </section>
  )
}
