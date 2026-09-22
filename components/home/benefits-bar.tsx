import { Truck, Store, MessageCircle, ShoppingBag } from "lucide-react"

// Solo condiciones confirmadas por el negocio: el envío NO es gratis; hay retiro en el local.
const benefits = [
  { icon: Truck, title: "Envíos a todo el país", detail: "Coordinamos el envío por WhatsApp" },
  { icon: Store, title: "Retiro en el local", detail: "Roca y Moreno, Concepción" },
  { icon: MessageCircle, title: "Asesoramiento real", detail: "Te ayudamos a elegir, sin juzgar" },
  { icon: ShoppingBag, title: "Pedido por WhatsApp", detail: "Armás tu carrito y nos lo enviás por WhatsApp. Sin registrarte." },
]

export function BenefitsBar() {
  return (
    <section aria-label="Cómo comprar" className="max-w-[1400px] mx-auto px-4 pt-6 sm:pt-8">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-start gap-3 p-4 sm:p-5 bg-card">
            <b.icon className="h-6 w-6 shrink-0 text-brand-green mt-0.5" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-tight">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{b.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
