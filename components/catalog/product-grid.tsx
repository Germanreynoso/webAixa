import { ProductCard } from "@/components/product-card"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import type { ProductGroup } from "@/lib/catalog"

export function ProductGrid({ groups }: { groups: ProductGroup[] }) {
  if (groups.length === 0) {
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
      {groups.map((group) => (
        <ProductCard key={group.key} group={group} />
      ))}
    </div>
  )
}
