import { ECommerceHeader } from "@/components/ecommerce-header"
import { HomeHero } from "@/components/home/home-hero"
import { FeaturedOfferCard } from "@/components/home/featured-offer-card"
import { BenefitsBar } from "@/components/home/benefits-bar"
import { CategoryMosaic } from "@/components/home/category-mosaic"
import { FeaturedOffers } from "@/components/featured-offers"
import { BrandStrip } from "@/components/home/brand-strip"
import { StoryTeaser } from "@/components/home/story-teaser"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />
      <div className="pb-12">
        <HomeHero />
        <FeaturedOfferCard />
        <BenefitsBar />
        <CategoryMosaic />
        <FeaturedOffers />
        <BrandStrip />
        <StoryTeaser />
        <Testimonials />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
