import Link from "next/link"
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/lib/products"

// Foto representativa por categoría (productos reales del catálogo).
const CATEGORY_IMAGE: Record<CategoryId, string> = {
  sustratos: "/products/growmix-multipro-x-80-dm.jpg",
  fertilizantes: "/products/flora-booster-x-500-ml.webp",
  "control-plagas": "/products/jabon-potasico-con-neem-y-canela-x-200-cc.jpg",
  macetas: "/products/mad-rocket-x-10-ltrs.jpg",
  accesorios: "/products/n-128-celdas.jpg",
}

const offersCount = PRODUCTS.filter((p) => p.onSale).length

export function CategoryMosaic() {
  return (
    <section aria-labelledby="categorias-title" className="max-w-[1400px] mx-auto px-4 pt-12">
      <h2
        id="categorias-title"
        className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-6"
      >
        Comprá por categoría
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length
          return (
            <Link
              key={cat.id}
              href={`/catalogo?cat=${cat.id}`}
              className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:border-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                <img
                  src={CATEGORY_IMAGE[cat.id]}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{count} productos</p>
              </div>
            </Link>
          )
        })}

        {/* Ofertas: mismo formato, pero en magenta para que se distinga */}
        <Link
          href="/catalogo?ofertas=1"
          className="group flex flex-col justify-between bg-primary text-primary-foreground rounded-sm overflow-hidden p-4 hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="text-5xl sm:text-6xl font-black leading-none" aria-hidden="true">
            %
          </span>
          <div className="mt-6">
            <p className="text-sm font-bold leading-tight">Ofertas</p>
            <p className="text-xs text-white/80 mt-1">{offersCount} productos con descuento</p>
          </div>
        </Link>
      </div>
    </section>
  )
}
