import { getCategory, type Product } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category)
  const showSale = product.onSale && product.salePrice != null

  return (
    <div className="group bg-card rounded-sm border border-border overflow-hidden hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col">
      {/* Image / placeholder */}
      <div className="relative aspect-square bg-background/50 overflow-hidden flex items-center justify-center p-4">
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
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white bg-primary">
            OFERTA
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white bg-foreground/60">
            SIN STOCK
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col items-center text-center flex-grow">
        {product.brand && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
            {product.brand}
          </span>
        )}
        <h3 className="text-xs font-bold text-foreground mb-2 line-clamp-2 min-h-[2rem]">
          {product.name}
        </h3>

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
