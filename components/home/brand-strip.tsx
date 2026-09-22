import Link from "next/link"
import { PRODUCTS } from "@/lib/products"
import { getBrands } from "@/lib/catalog"

const brands = getBrands().map((name) => ({
  name,
  count: PRODUCTS.filter((p) => p.brand === name).length,
}))

export function BrandStrip() {
  if (brands.length === 0) return null

  return (
    <section aria-labelledby="marcas-title" className="max-w-[1400px] mx-auto px-4 pt-16 md:pt-24">
      <h2
        id="marcas-title"
        className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-6 md:mb-8"
      >
        Marcas que trabajamos
      </h2>
      <ul className="flex flex-wrap gap-2 sm:gap-3">
        {brands.map((brand) => (
          <li key={brand.name}>
            <Link
              href={`/catalogo?marca=${encodeURIComponent(brand.name)}`}
              className="inline-flex items-baseline gap-2 px-4 py-2.5 bg-card border border-border rounded-sm text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {brand.name}
              <span className="text-xs font-medium text-muted-foreground">{brand.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
