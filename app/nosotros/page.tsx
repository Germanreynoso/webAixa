import type { Metadata } from "next"
import { ECommerceHeader } from "@/components/ecommerce-header"
import { AboutManifesto } from "@/components/about-manifesto"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Nosotros | El Grow de Aixa",
  description:
    "La historia, el manifiesto, la misión y la visión de El Grow de Aixa, el primer growshop de Concepción, Tucumán.",
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen gradient-hero">
      <ECommerceHeader />
      <AboutManifesto />
      <ContactSection />
      <Footer />
    </main>
  )
}
