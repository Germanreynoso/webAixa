import { cn } from "@/lib/utils"

const LOGO_TILE = "/images/logo.jpeg"

// Fotos reales del catálogo (3 columnas). Sin personas, a pedido del negocio.
const SHOWCASE_COLUMNS = [
  [
    "/products/oro-negro-x-500-ml.webp",
    "/products/growmix-multipro-x-80-dm.jpg",
    "/products/trico-x-250-gr.webp",
    "/products/deeper-x-250-ml.jpg",
  ],
  [
    "/products/flora-booster-x-500-ml.webp",
    LOGO_TILE,
    "/products/cultivate-completo-x-25-dm.webp",
    "/products/amazonia-x-300-gr.png",
  ],
  [
    "/products/vitaflor-all-mix-x-50-dm.png",
    "/products/detox-x-2-ltr.webp",
    "/products/living-soil-x-20-dm.jpg",
    "/products/humus-de-lombriz-x-5-dm.png",
  ],
]

/** Mosaico de marca: productos del catálogo sobre el magenta del logo. */
export function BrandMosaic({ className, caption = true }: { className?: string; caption?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden border border-border/50 shadow-2xl gradient-hero-vibrant",
        className,
      )}
    >
      <img
        src={LOGO_TILE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-150 blur-2xl opacity-60"
      />
      <div className="absolute inset-0 grid grid-cols-3 gap-3 sm:gap-4 p-5 sm:p-7 -rotate-3 scale-110">
        {SHOWCASE_COLUMNS.map((column, i) => (
          <div key={i} className={`flex flex-col gap-3 sm:gap-4 ${i === 1 ? "-mt-10" : "mt-6"}`}>
            {column.map((src) =>
              src === LOGO_TILE ? (
                <div key={src} className="aspect-square rounded-2xl overflow-hidden shadow-xl ring-2 ring-primary/60">
                  <img src={src} alt="El Grow de Aixa" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div key={src} className="aspect-square rounded-2xl bg-white p-3 shadow-xl">
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-contain" />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">Todo para tu cultivo</p>
          <p className="text-lg sm:text-xl font-bold text-foreground">Concepción, Tucumán</p>
        </div>
      )}
    </div>
  )
}
