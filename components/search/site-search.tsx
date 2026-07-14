"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Bug, Container, FlaskConical, Search, Sprout, Tag, Wrench } from "lucide-react"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { QuickChips } from "@/components/search/quick-chips"
import { getBrands, searchProductSuggestions } from "@/lib/catalog"
import { CATEGORIES, getCategory, type CategoryId } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

const CATEGORY_ICON: Record<CategoryId, typeof Sprout> = {
  sustratos: Sprout,
  fertilizantes: FlaskConical,
  "control-plagas": Bug,
  macetas: Container,
  accesorios: Wrench,
}

const MAX_BRAND_SUGGESTIONS = 8

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
}

interface SiteSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  // Atajo de teclado ⌘K / Ctrl+K para abrir/cerrar.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  // Resetear el texto al ABRIR (no al cerrar) para que reabra en su estado por
  // defecto sin alterar el contenido visible durante la animación de salida.
  useEffect(() => {
    if (open) setQuery("")
  }, [open])

  const go = (href: string) => {
    onOpenChange(false)
    setQuery("")
    router.push(href)
  }

  const q = query.trim()
  const nq = normalize(q)

  const categoryMatches = useMemo(
    () => (q ? CATEGORIES.filter((c) => normalize(`${c.label} ${c.shortLabel}`).includes(nq)) : CATEGORIES),
    [q, nq],
  )

  const brandMatches = useMemo(() => {
    const all = getBrands()
    const list = q ? all.filter((b) => normalize(b).includes(nq)) : all
    return list.slice(0, MAX_BRAND_SUGGESTIONS)
  }, [q, nq])

  const productMatches = useMemo(
    () => (q ? searchProductSuggestions(q) : []),
    [q],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[12vh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Buscar</DialogTitle>
          <DialogDescription>
            Buscá productos, marcas o categorías del catálogo.
          </DialogDescription>
        </DialogHeader>

        <Command shouldFilter={false} className="bg-transparent">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Buscá productos, marcas o categorías..."
          />

          {/* Accesos rápidos: lo principal que ofrece la página, siempre visibles. */}
          <div className="border-b border-border px-3 py-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Explorá
            </p>
            <QuickChips onSelect={go} />
          </div>

          <CommandList className="max-h-[50vh]">
            {/* Búsqueda por texto libre: siempre disponible como salida al catálogo. */}
            {q && (
              <CommandGroup heading="Buscar">
                <CommandItem
                  value="freetext-search"
                  onSelect={() => go(`/catalogo?q=${encodeURIComponent(q)}`)}
                  className="cursor-pointer"
                >
                  <Search className="text-primary" />
                  <span>
                    Buscar <span className="font-semibold">“{q}”</span> en el catálogo
                  </span>
                </CommandItem>
              </CommandGroup>
            )}

            {categoryMatches.length > 0 && (
              <CommandGroup heading="Categorías">
                {categoryMatches.map((c) => {
                  const Icon = CATEGORY_ICON[c.id]
                  return (
                    <CommandItem
                      key={`cat-${c.id}`}
                      value={`cat-${c.id}`}
                      onSelect={() => go(`/catalogo?cat=${c.id}`)}
                      className="cursor-pointer"
                    >
                      <Icon className="text-primary" />
                      <span className="font-semibold">{c.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}

            {brandMatches.length > 0 && (
              <CommandGroup heading="Marcas">
                {brandMatches.map((b) => (
                  <CommandItem
                    key={`brand-${b}`}
                    value={`brand-${b}`}
                    onSelect={() => go(`/catalogo?marca=${encodeURIComponent(b)}`)}
                    className="cursor-pointer"
                  >
                    <Tag className="text-muted-foreground" />
                    <span>{b}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {productMatches.length > 0 && (
              <CommandGroup heading="Productos">
                {productMatches.map((p) => {
                  const emoji = getCategory(p.category)?.fallbackEmoji ?? "🌱"
                  return (
                    <CommandItem
                      key={`prod-${p.id}`}
                      value={`prod-${p.id}`}
                      onSelect={() => go(`/catalogo?q=${encodeURIComponent(p.name)}`)}
                      className="cursor-pointer"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-background">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt="" className="h-full w-full object-contain p-0.5" />
                        ) : (
                          <span className="text-lg">{emoji}</span>
                        )}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        {p.brand && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {p.brand}
                          </span>
                        )}
                        <span className="truncate text-sm font-medium text-foreground">{p.name}</span>
                      </span>
                      <span className="ml-auto shrink-0 text-xs font-bold text-foreground">
                        {p.price != null ? formatPrice(p.price) : "Consultar"}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
