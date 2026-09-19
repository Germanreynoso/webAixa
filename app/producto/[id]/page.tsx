import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Store, Truck, MessageCircle } from "lucide-react"
import { ECommerceHeader } from "@/components/ecommerce-header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { PRODUCTS, getCategory } from "@/lib/products"
import {
  getDiscountPercent,
  getProductById,
  getRelatedProducts,
  getSiblingVariants,
  getVariantLabel,
} from "@/lib/catalog"
import { WHATSAPP_PHONE } from "@/lib/site"
import { cn, formatPrice } from "@/lib/utils"

type Params = Promise<{ id: string }>

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: "Producto no encontrado | El Grow de Aixa" }
  const category = getCategory(product.category)
  return {
    title: `${product.name} | El Grow de Aixa`,
    description: `${product.name}${product.brand ? ` de ${product.brand}` : ""}. ${category?.blurb ?? ""} Retiro en el local de Concepción o envío a todo el país.`,
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const category = getCategory(product.category)
  const variants = getSiblingVariants(product)
  const related = getRelatedProducts(product)
  const discount = getDiscountPercent(product)
  const showSale = product.onSale && product.salePrice != null
  const consultHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hola! Quería consultar por: ${product.name}`,
  )}`

  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />

      <div className="max-w-[1400px] mx-auto px-4 pt-6 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación" className="text-xs text-muted-foreground mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/catalogo?cat=${category.id}`} className="hover:text-primary transition-colors">
                    {category.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-semibold" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 bg-card border border-border rounded-sm p-4 sm:p-8">
          {/* Foto */}
          <div
            className={`relative aspect-square rounded-sm overflow-hidden flex items-center justify-center p-6 sm:p-10 ${
              product.image ? "bg-white" : "bg-background"
            }`}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-contain ${product.inStock ? "" : "opacity-50 grayscale"}`}
              />
            ) : (
              <span className="text-8xl opacity-80" aria-hidden="true">{category?.fallbackEmoji ?? "🌱"}</span>
            )}
            {discount != null && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-sm text-sm font-black text-white bg-primary">
                -{discount}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.brand && (
              <Link
                href={`/catalogo?marca=${encodeURIComponent(product.brand)}`}
                className="text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {product.brand}
              </Link>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-foreground">
              {product.name}
            </h1>

            {/* Precio */}
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {showSale ? (
                <>
                  <span className="text-3xl sm:text-4xl font-black text-foreground">
                    {formatPrice(product.salePrice as number)}
                  </span>
                  {product.price != null && (
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  )}
                </>
              ) : product.price != null ? (
                <span className="text-3xl sm:text-4xl font-black text-foreground">{formatPrice(product.price)}</span>
              ) : (
                <span className="text-2xl font-black text-primary">Precio a consultar</span>
              )}
            </div>

            {/* Stock */}
            <p className="mt-3 flex items-center gap-2 text-sm font-bold">
              <span
                aria-hidden="true"
                className={cn("h-2.5 w-2.5 rounded-full", product.inStock ? "bg-brand-green" : "bg-muted-foreground")}
              />
              <span className={product.inStock ? "text-brand-green" : "text-muted-foreground"}>
                {product.inStock ? "En stock" : "Sin stock por ahora"}
              </span>
            </p>

            {/* Presentaciones */}
            {variants.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-bold text-foreground mb-2">Presentación</p>
                <ul className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <li key={v.id}>
                      <Link
                        href={`/producto/${v.id}`}
                        aria-current={v.id === product.id ? "page" : undefined}
                        className={cn(
                          "inline-flex px-4 py-2 rounded-sm border text-sm font-bold transition-colors",
                          v.id === product.id
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border text-foreground/80 hover:border-primary",
                          !v.inStock && v.id !== product.id && "line-through opacity-50",
                        )}
                      >
                        {getVariantLabel(v)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Acciones */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <div className="sm:flex-1 rounded-sm overflow-hidden [&>button]:py-4 [&>button]:text-sm">
                <AddToCartButton product={product} />
              </div>
              <a
                href={consultHref}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:flex-1 inline-flex items-center justify-center gap-2 py-4 px-5 rounded-sm border border-brand-green text-brand-green text-sm font-bold uppercase hover:bg-brand-green hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </div>

            {/* Entrega */}
            <ul className="mt-8 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Store className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Retiro en el local.</strong> Roca y Moreno, Concepción, Tucumán.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Envíos a todo el país.</strong> El costo se coordina por WhatsApp
                  al confirmar el pedido.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section aria-labelledby="relacionados-title" className="mt-14">
            <h2
              id="relacionados-title"
              className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-5"
            >
              También te puede servir
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
