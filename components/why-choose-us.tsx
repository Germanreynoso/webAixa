import { CheckCircle, Users, Headphones } from "lucide-react"

const reasons = [
  {
    icon: CheckCircle,
    title: "Productos de Calidad",
    description: "Seleccionamos los mejores productos del mercado para garantizar tu éxito",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Formá parte de una comunidad de cultivadores apasionados",
  },
  {
    icon: Headphones,
    title: "Soporte Continuo",
    description: "Estamos disponibles para resolver tus dudas en cualquier momento",
  },
]

export function WhyChooseUs() {
  return (
    <section id="nosotros" className="py-20 sm:py-28 bg-transparent border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-3">
              Por qué elegirnos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Tu cultivo, nuestra pasión
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              En El Grow de Aixa nos dedicamos a brindarte todo lo necesario para que tu cultivo prospere. Con años de experiencia y una selección cuidadosa de productos, somos tu aliado en cada etapa del crecimiento.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-card overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 opacity-80">🌿</div>
                  <p className="text-xl font-bold text-foreground">El Grow de Aixa</p>
                  <p className="text-muted-foreground">Concepción, Tucumán</p>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg p-6 border border-border">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-lg p-6 border border-border">
              <div className="text-3xl font-bold text-secondary">100+</div>
              <div className="text-sm text-muted-foreground">Productos Disponibles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
