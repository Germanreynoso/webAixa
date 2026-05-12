import { ECommerceHeader } from "@/components/ecommerce-header"
import { StoreHeroLayout } from "@/components/store-hero-layout"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutManifesto } from "@/components/about-manifesto"
import { InfoBanner } from "@/components/info-banner"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingSidebar } from "@/components/floating-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />
      <FloatingSidebar />
      <div className="pb-12">
        <StoreHeroLayout />
        <AboutManifesto />
        <FeaturedProducts />
        <InfoBanner />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
