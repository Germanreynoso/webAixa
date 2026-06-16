"use client"

import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { useCart, type CartItem } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { WHATSAPP_PHONE } from "@/lib/site"

function buildMessage(items: CartItem[], total: number, hasConsultar: boolean) {
  const lines = items.map((it) => {
    const sub = it.price != null ? formatPrice(it.price * it.qty) : "a consultar"
    return `• ${it.name} (x${it.qty}) — ${sub}`
  })
  let msg = `¡Hola! Quiero hacer este pedido:\n\n${lines.join("\n")}\n\n`
  if (total > 0) {
    msg += `Total: ${formatPrice(total)}`
    if (hasConsultar) msg += " (+ productos a consultar)"
  } else {
    msg += "Total: a consultar"
  }
  msg += "\n\n¿Me confirmás disponibilidad y forma de pago?"
  return msg
}

export function CartDrawer() {
  const { items, count, total, hasConsultar, isOpen, setOpen, increment, decrement, removeItem, clear } =
    useCart()

  const handleCheckout = () => {
    const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      buildMessage(items, total, hasConsultar),
    )}`
    window.open(href, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 gap-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Tu carrito {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Productos agregados a tu pedido. Finalizá la compra por WhatsApp.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
            <p className="text-xs text-muted-foreground/70">
              Agregá productos desde el catálogo para armar tu pedido.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {items.map((it) => (
              <div key={it.id} className="flex gap-3 border-b border-border pb-3 last:border-0">
                <div className="h-16 w-16 flex-shrink-0 rounded-sm bg-background/50 overflow-hidden flex items-center justify-center">
                  {it.image ? (
                    <img src={it.image} alt={it.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl opacity-70">🌱</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground line-clamp-2">{it.name}</h4>
                  <p className="text-xs text-primary font-bold mt-0.5">
                    {it.price != null ? formatPrice(it.price) : "Consultar"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded-sm">
                      <button
                        type="button"
                        onClick={() => decrement(it.id)}
                        aria-label="Restar"
                        className="px-2 py-1 hover:bg-muted text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-bold w-7 text-center">{it.qty}</span>
                      <button
                        type="button"
                        onClick={() => increment(it.id)}
                        aria-label="Sumar"
                        className="px-2 py-1 hover:bg-muted text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(it.id)}
                      aria-label="Quitar"
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs font-black text-foreground whitespace-nowrap self-start">
                  {it.price != null ? formatPrice(it.price * it.qty) : "—"}
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t border-border gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-black text-foreground">
                {total > 0 ? formatPrice(total) : "A consultar"}
              </span>
            </div>
            {hasConsultar && total > 0 && (
              <p className="text-[11px] text-muted-foreground -mt-1">
                + productos a consultar (precio a definir con el vendedor)
              </p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3 bg-secondary hover:bg-primary text-white text-sm font-bold uppercase tracking-wide rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Finalizar pedido por WhatsApp
            </button>
            <button
              type="button"
              onClick={clear}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Vaciar carrito
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
