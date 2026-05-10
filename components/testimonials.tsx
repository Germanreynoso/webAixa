import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Martín G.",
    location: "Concepción",
    rating: 5,
    text: "Excelente atención y productos de primera. Aixa siempre está dispuesta a ayudar y asesorar. Mi cultivo nunca estuvo mejor.",
    avatar: "MG",
  },
  {
    name: "Lucía P.",
    location: "Tucumán",
    rating: 5,
    text: "Los mejores precios de la zona y envío súper rápido. Muy recomendado para cualquier cultivador.",
    avatar: "LP",
  },
  {
    name: "Carlos R.",
    location: "Monteros",
    rating: 5,
    text: "Llevo un año comprando acá y siempre quedo satisfecho. El asesoramiento hace la diferencia.",
    avatar: "CR",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
