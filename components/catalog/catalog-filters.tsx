"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { CategoryId, CategoryMeta } from "@/lib/products"

export type FilterCategory = CategoryId | "all"

interface CatalogFiltersProps {
  categories: CategoryMeta[]
  category: FilterCategory
  onCategoryChange: (category: FilterCategory) => void
  query: string
  onQueryChange: (query: string) => void
  inStockOnly: boolean
  onInStockToggle: (value: boolean) => void
  offersOnly: boolean
  onOffersToggle: (value: boolean) => void
  total: number
}

export function CatalogFilters({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  inStockOnly,
  onInStockToggle,
  offersOnly,
  onOffersToggle,
  total,
}: CatalogFiltersProps) {
  const chips: { id: FilterCategory; label: string }[] = [
    { id: "all", label: "Todos" },
    ...categories.map((c) => ({ id: c.id, label: c.shortLabel })),
  ]

  return (
    <div className="sticky top-[124px] z-30 -mx-4 px-4 py-4 mb-8 bg-background/80 backdrop-blur border-b border-border">
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar productos..."
          className="pl-9 bg-card border-border h-11 focus-visible:ring-primary/30 text-foreground"
          aria-label="Buscar productos"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onCategoryChange(chip.id)}
            aria-pressed={category === chip.id}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors",
              category === chip.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground/70 border-border hover:border-primary/50 hover:text-foreground",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Toggles + count */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <Switch id="filter-offers" checked={offersOnly} onCheckedChange={onOffersToggle} />
          <Label htmlFor="filter-offers" className="text-xs text-foreground/80 cursor-pointer">
            Solo ofertas
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="filter-stock" checked={inStockOnly} onCheckedChange={onInStockToggle} />
          <Label htmlFor="filter-stock" className="text-xs text-foreground/80 cursor-pointer">
            En stock
          </Label>
        </div>
        <span className="text-xs text-muted-foreground">
          {total} {total === 1 ? "producto" : "productos"}
        </span>
      </div>
    </div>
  )
}
