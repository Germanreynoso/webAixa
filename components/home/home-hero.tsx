import Link from "next/link"

export function HomeHero() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 pt-4">
      <div className="relative overflow-hidden rounded-sm border border-border/50 bg-black">
        {/* Textura de hojas del logo; se oscurece hacia la izquierda para que el texto se lea */}
        <img
          src="/images/hero-leaves.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />

        <div className="relative max-w-2xl px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight text-white">
            Todo para tu cultivo
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
            Sustratos, fertilizantes, control de plagas y macetas. Retirás en el local de
            Concepción o te lo enviamos a cualquier punto del país.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center px-7 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver catálogo
            </Link>
            <Link
              href="/catalogo?ofertas=1"
              className="inline-flex items-center px-7 py-3.5 bg-white/10 text-white text-sm font-bold uppercase tracking-wide rounded-sm border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
