import { ECommerceHeader } from "@/components/ecommerce-header"
import { StoreHeroLayout } from "@/components/store-hero-layout"
import { FeaturedProducts } from "@/components/featured-products"
import { InfoBanner } from "@/components/info-banner"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FloatingSidebar } from "@/components/floating-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <ECommerceHeader />
      <FloatingSidebar />
      <div className="pb-12">
        <StoreHeroLayout />
        <FeaturedProducts />
        <InfoBanner />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
