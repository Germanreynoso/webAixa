import { Truck, MessageCircle, Award } from "lucide-react"

export function InfoBanner() {
  return (
    <section className="py-16 gradient-hero relative overflow-hidden">
      {/* Overlay to ensure readability and depth */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
            ¡Envíos a toda Tucumán!
          </h2>
          <p className="text-white/80 text-lg">
            Recibí tus productos en la puerta de tu casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Envíos Rápidos
            </h3>
            <p className="text-white/80">
              Entregas en 24-48hs en Concepción y alrededores
            </p>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Atención Personalizada
            </h3>
            <p className="text-white/80">
              Te asesoramos en cada paso de tu cultivo
            </p>
          </div>

          {/* Quality */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Asesoramiento Experto
            </h3>
            <p className="text-white/80">
              Años de experiencia a tu disposición
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
