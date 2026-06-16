import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ECommerceHeader } from "@/components/ecommerce-header"
import { StoreHeroLayout } from "@/components/store-hero-layout"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutManifesto } from "@/components/about-manifesto"
import { InfoBanner } from "@/components/info-banner"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />
      <div className="pb-12">
        <StoreHeroLayout />
        <AboutManifesto />
        <FeaturedProducts />
        <div className="flex justify-center pb-4">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-accent transition-colors"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <InfoBanner />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
