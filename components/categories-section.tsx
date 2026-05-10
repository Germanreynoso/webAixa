import { Layers, Leaf, Sun, Droplets, FlaskConical, Wrench, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Sustratos y Tierra",
    description: "Mezclas premium para un crecimiento óptimo",
    icon: Layers,
    color: "bg-primary",
  },
  {
    name: "Semillas y Genética",
    description: "Variedades seleccionadas de alta calidad",
    icon: Leaf,
    color: "bg-secondary",
  },
  {
    name: "Iluminación",
    description: "LEDs y sistemas de luz profesionales",
    icon: Sun,
    color: "bg-primary",
  },
  {
    name: "Nutrientes y Fertilizantes",
    description: "Alimentación completa para tus plantas",
    icon: FlaskConical,
    color: "bg-secondary",
  },
  {
    name: "Sistemas de Riego",
    description: "Soluciones automatizadas de riego",
    icon: Droplets,
    color: "bg-primary",
  },
  {
    name: "Herramientas y Accesorios",
    description: "Todo lo necesario para tu espacio",
    icon: Wrench,
    color: "bg-secondary",
  },
]

export function CategoriesSection() {
  return (
    <section id="categorias" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 brand-pattern pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Categorías
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Todo lo que necesitas
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Explorá nuestra amplia selección de productos para cada etapa de tu cultivo
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-card border border-border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${category.color} mb-6`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Explorar
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Hover Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
