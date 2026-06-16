import { ProductCard } from "@/components/product-card"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import type { Product } from "@/lib/products"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <Empty className="border border-dashed border-border bg-card/30">
        <EmptyTitle>Sin resultados</EmptyTitle>
        <EmptyDescription>
          No encontramos productos con esos filtros. Probá con otra búsqueda o categoría.
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
