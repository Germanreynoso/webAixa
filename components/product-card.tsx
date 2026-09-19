"use client"

import { useState } from "react"
import Link from "next/link"
import { getCategory, type Product } from "@/lib/products"
import { getDiscountPercent, getVariantLabel, type ProductGroup } from "@/lib/catalog"
import { cn, formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"

type ProductCardProps = { product: Product; group?: never } | { group: ProductGroup; product?: never }

export function ProductCard(props: ProductCardProps) {
  const variants = props.group ? props.group.variants : [props.product]
  // Arranca en la primera presentación con stock, para no abrir la tarjeta en "sin stock".
  const [selectedId, setSelectedId] = useState(
    () => (variants.find((v) => v.inStock) ?? variants[0]).id,
  )
  // Si los filtros cambian las variantes visibles, la selección puede dejar de existir.
  const product = variants.find((v) => v.id === selectedId) ?? variants[0]
  const hasVariants = variants.length > 1
  const title = hasVariants && props.group ? props.group.baseName : product.name

  const category = getCategory(product.category)
  const showSale = product.onSale && product.salePrice != null
  const discount = getDiscountPercent(product)
  const href = `/producto/${product.id}`

  return (
    <div className="group bg-card rounded-sm border border-border overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col">
      {/* Image / placeholder */}
      <Link
        href={href}
        aria-label={`Ver ${product.name}`}
        className={`relative aspect-square overflow-hidden flex items-center justify-center p-4 ${product.image ? "bg-white" : "bg-background/50"}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${
              product.inStock ? "" : "opacity-50 grayscale"
            }`}
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-background rounded-sm border border-primary/10 transition-transform duration-500 group-hover:scale-105 ${
              product.inStock ? "" : "opacity-50 grayscale"
            }`}
          >
            <span className="text-5xl opacity-80">{category?.fallbackEmoji ?? "🌱"}</span>
            {category && (
              <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
                {category.shortLabel}
              </span>
            )}
          </div>
        )}

        {/* Badges */}
        {product.onSale && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[11px] font-black text-white bg-primary">
            {discount != null ? `-${discount}%` : "OFERTA"}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white bg-black/70">
            SIN STOCK
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col items-center text-center flex-grow">
        {product.brand && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
            {product.brand}
          </span>
        )}
        <h3 className="text-xs font-bold text-foreground mb-2 line-clamp-2 min-h-[2rem]">
          <Link href={href} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        {/* Presentaciones */}
        {hasVariants && (
          <div
            role="radiogroup"
            aria-label={`Presentación de ${title}`}
            className="flex flex-wrap justify-center gap-1 mb-2"
          >
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === product.id}
                onClick={() => setSelectedId(v.id)}
                className={cn(
                  "px-1.5 py-0.5 rounded-sm border text-[10px] font-bold transition-colors",
                  v.id === product.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-foreground/70 hover:border-primary/60",
                  !v.inStock && v.id !== product.id && "line-through opacity-50",
                )}
              >
                {getVariantLabel(v)}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto min-h-[1.5rem] flex items-baseline justify-center gap-1.5">
          {product.price === null && product.inStock && (
            <span className="text-sm font-black text-primary">Consultar</span>
          )}
          {showSale ? (
            <>
              <span className="text-sm font-black text-foreground">
                {formatPrice(product.salePrice as number)}
              </span>
              {product.price != null && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </>
          ) : (
            product.price != null && (
              <span className="text-sm font-black text-foreground">
                {formatPrice(product.price)}
              </span>
            )
          )}
        </div>
      </div>

      {/* CTA */}
      <AddToCartButton product={product} />
    </div>
  )
}
