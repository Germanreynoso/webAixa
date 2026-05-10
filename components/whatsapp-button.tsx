"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "5493865718714"
  const message = encodeURIComponent("Hola! Quiero más información sobre los productos de El Grow de Aixa")

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-primary px-5 py-4 text-white shadow-lg hover:bg-accent transition-all hover:scale-105 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline font-semibold">WhatsApp</span>
      
      {/* Pulse animation */}
      <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping opacity-75" />
    </a>
  )
}
