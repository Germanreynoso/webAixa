import Link from "next/link"
import { getDiscountPercent, getFeaturedOffer } from "@/lib/catalog"
import { formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"

const featured = getFeaturedOffer()
const featuredPct = featured ? getDiscountPercent(featured) : null

export function HomeHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 pt-4">
      <div className="relative overflow-hidden rounded-sm border border-border/50 bg-black">
        {/* Textura de hojas del logo; se oscurece hacia la izquierda para que el texto se lea */}
        <img
          src="/images/hero-leaves.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_340px] items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight text-white">
              Todo para tu cultivo
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              Sustratos, fertilizantes, control de plagas y macetas. Retirás en el local de
              Concepción o te lo enviamos a cualquier punto del país.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center px-7 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver catálogo
              </Link>
              <Link
                href="/catalogo?ofertas=1"
                className="inline-flex items-center px-7 py-3.5 bg-white/10 text-white text-sm font-bold uppercase tracking-wide rounded-sm border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver ofertas
              </Link>
            </div>
          </div>

          {/* Oferta destacada: sale sola del catálogo (mayor descuento con stock) */}
          {featured && (
            <div className="w-full max-w-[340px] bg-card/95 border border-border rounded-sm overflow-hidden shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between px-4 py-2.5 bg-secondary text-white">
                <span className="text-xs font-bold uppercase tracking-wide">Oferta destacada</span>
                {featuredPct != null && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-secondary text-xs font-black">
                    -{featuredPct}%
                  </span>
                )}
              </div>
              <div className="flex gap-4 p-4">
                <div className="h-28 w-28 shrink-0 rounded-sm bg-white p-2">
                  <img src={featured.image} alt={featured.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  {featured.brand && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {featured.brand}
                    </span>
                  )}
                  <h2 className="text-sm font-bold text-foreground line-clamp-2">
                    <Link href={`/producto/${featured.id}`} className="hover:text-primary transition-colors">
                      {featured.name}
                    </Link>
                  </h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-black text-foreground">
                      {formatPrice(featured.salePrice as number)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(featured.price as number)}
                    </span>
                  </div>
                </div>
              </div>
              <AddToCartButton product={featured} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
