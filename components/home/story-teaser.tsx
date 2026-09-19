import Link from "next/link"
import { BrandMosaic } from "@/components/brand-mosaic"

export function StoryTeaser() {
  return (
    <section aria-labelledby="historia-title" className="max-w-[1400px] mx-auto px-4 pt-16">
      <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-8 md:gap-12 items-center bg-card border border-border rounded-sm p-6 sm:p-10">
        <BrandMosaic caption={false} className="rounded-sm max-md:aspect-[16/10]" />

        <div className="max-w-2xl">
          <h2
            id="historia-title"
            className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.05] text-foreground"
          >
            El primer grow de Concepción
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Abrimos este Grow porque en nuestra ciudad no existía un espacio como este. Lo hicimos por
            necesidad, por convicción y por comunidad. No es solo un punto de venta: es un lugar para
            aprender, intercambiar saberes y defender nuestros derechos.
          </p>
          <p className="mt-4 text-base font-semibold text-foreground">
            Cultivar no es delito: es derecho, es salud, es libertad.
          </p>
          <Link
            href="/nosotros"
            className="mt-7 inline-flex items-center px-6 py-3 border border-primary text-primary text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Conocé nuestra historia
          </Link>
        </div>
      </div>
    </section>
  )
}
