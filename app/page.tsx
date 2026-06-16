import { ECommerceHeader } from "@/components/ecommerce-header"
import { StoreHeroLayout } from "@/components/store-hero-layout"
import { FeaturedOffers } from "@/components/featured-offers"
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
        <FeaturedOffers />
        <InfoBanner />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
