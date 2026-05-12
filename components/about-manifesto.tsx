import Image from "next/image"
import { Heart, Target, Eye, Quote } from "lucide-react"

export function AboutManifesto() {
  return (
    <section id="historia" className="py-24 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 brand-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Section: Story & Aixa */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4 fill-primary" />
              Nuestra Historia
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
              Cultivando comunidad, <br />
              <span className="text-primary italic">conciencia y libertad</span>.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                ¡Hola! Soy <strong className="text-foreground">Aixa Figueroa</strong>, estudiante, activista cannábica y fundadora de 
                <span className="text-primary font-semibold"> El Grow de Aixa</span>. Este emprendimiento nace desde el amor y el respeto por la planta, el activismo, el cultivo y la educación.
              </p>
              <p>
                Abrimos este Grow porque en nuestra ciudad, Concepción, no existía un espacio como este. Lo hicimos por necesidad, por convicción y por comunidad. Queremos que cultivar deje de ser tabú.
              </p>
              <p>
                Este no es solo un punto de venta: es un espacio de encuentro para aprender, intercambiar saberes, acceder a herramientas, acompañarnos y defender nuestros derechos.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-card/40 border border-border backdrop-blur-md hover:border-primary/30 transition-all">
                <div className="text-primary font-bold text-xl mb-1">Primer Grow</div>
                <div className="text-sm text-muted-foreground italic">de Concepción, Tucumán</div>
              </div>
              <div className="p-5 rounded-2xl bg-card/40 border border-border backdrop-blur-md hover:border-secondary/30 transition-all">
                <div className="text-secondary font-bold text-xl mb-1">Activismo</div>
                <div className="text-sm text-muted-foreground italic">Cultura cannábica libre</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl group">
              <Image 
                src="/images/about/manifesto.png" 
                alt="El Grow de Aixa - Identidad"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/20 blur-2xl rounded-full" />
          </div>
        </div>

        {/* Manifesto Section */}
        <div className="mb-32 relative py-16 px-6 rounded-[3rem] bg-gradient-to-br from-card/50 to-transparent border border-border/50 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none">
            <Quote className="w-32 h-32 rotate-180" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Nuestro Manifiesto</span>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.2] mb-12 text-balance">
              En una ciudad donde hablar de cannabis aún incomoda, <br />
              <span className="text-primary relative inline-block">
                elegimos abrir la puerta.
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 -rotate-1" />
              </span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12 text-left items-center">
              <div className="space-y-6">
                <p className="text-2xl leading-relaxed text-foreground/90 font-medium italic border-l-4 border-primary pl-6">
                  "No venimos solo a vender: venimos a educar, acompañar y transformar. Cultivar no es delito: es derecho, es salud, es libertad, es futuro."
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Te acompañamos en cada paso: desde la semilla hasta la cosecha. Con productos de calidad, asesoramiento real y sin juzgar.
                </p>
                <p className="text-lg text-foreground font-semibold">
                  Promovemos la educación, la responsabilidad y la soberanía.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {["#CultivoConsciente", "#ActivismoCannábico", "#CannabisConAmor"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/5 text-xs font-bold text-primary/70 border border-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="group relative p-10 rounded-[3rem] bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(210,4,128,0.2)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-6">Nuestra Misión</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Promover el cultivo responsable y el acceso consciente al cannabis a través de la educación, el acompañamiento y la venta de productos de calidad. Trabajamos para transformar la percepción social del cannabis en nuestra región, defendiendo el derecho a cultivar, sanar y elegir.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative p-10 rounded-[3rem] bg-card border border-border overflow-hidden hover:border-secondary/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(167,3,102,0.2)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 blur-[80px] rounded-full group-hover:bg-secondary/10 transition-all" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-6">Nuestra Visión</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Soñamos con una Concepción libre de estigmas, donde hablar de cannabis no sea tabú, y cultivar sea un derecho garantizado y respetado. Nos proyectamos como un espacio de referencia que impulsa una cultura cannábica basada en la educación, el respeto, la salud y la autonomía.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
