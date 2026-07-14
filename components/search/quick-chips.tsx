"use client"

import Link from "next/link"
import { Tag } from "lucide-react"
import { CATEGORIES } from "@/lib/products"
import { cn } from "@/lib/utils"

export interface QuickChip {
  label: string
  href: string
  highlight?: boolean
}

/** Accesos rápidos a lo principal que ofrece la página: categorías + ofertas. */
export const QUICK_CHIPS: QuickChip[] = [
  ...CATEGORIES.map((c) => ({ label: c.shortLabel, href: `/catalogo?cat=${c.id}` })),
  { label: "Ofertas", href: "/catalogo?ofertas=1", highlight: true },
]

interface QuickChipsProps {
  /** Si se pasa, los chips ejecutan este callback en vez de navegar con <Link> (útil dentro de un diálogo). */
  onSelect?: (href: string) => void
  className?: string
}

export function QuickChips({ onSelect, className }: QuickChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {QUICK_CHIPS.map((chip) => {
        const classes = cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors",
          chip.highlight
            ? "bg-primary/10 text-primary border-primary/40 hover:bg-primary hover:text-primary-foreground"
            : "bg-card text-foreground/70 border-border hover:border-primary/50 hover:text-foreground",
        )
        const content = (
          <>
            {chip.highlight && <Tag className="h-3.5 w-3.5" />}
            {chip.label}
          </>
        )

        if (onSelect) {
          return (
            <button key={chip.href} type="button" onClick={() => onSelect(chip.href)} className={classes}>
              {content}
            </button>
          )
        }

        return (
          <Link key={chip.href} href={chip.href} className={classes}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}
