"use client"

import { MapPin, Phone, Clock, Instagram, Send, Facebook } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle form submission
    const whatsappMessage = encodeURIComponent(
      `Hola! Soy ${formData.name}. ${formData.message}`
    )
    window.open(`https://wa.me/5493865718714?text=${whatsappMessage}`, "_blank")
  }

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Visitanos o escribinos
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Estamos acá para ayudarte con todo lo que necesites para tu cultivo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-1">Ubicación</h3>
                <a
                  href="https://www.google.com/maps?q=-27.3430743,-65.5899327&z=17&hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Roca y esquina Moreno, Concepción - Tucumán
                </a>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/5493865718714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  386-5-718-714
                </a>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-1">Horarios</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  Lunes a Sábados{'\n'}09:00 a 13:00 / 17:00 a 21:00
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Instagram className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-1">Instagram</h3>
                <a
                  href="https://instagram.com/elgrowdeaixa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @elgrowdeaixa
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-[300px]">
              <iframe
                src="https://maps.google.com/maps?q=-27.3430743,-65.5899327&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de El Grow de Aixa"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Envianos un mensaje
            </h3>
            <p className="text-muted-foreground mb-8">
              Completá el formulario y te responderemos a la brevedad
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground hover:bg-accent transition-colors"
              >
                <Send className="h-5 w-5" />
                Enviar por WhatsApp
              </button>
              <a
                href="https://instagram.com/elgrowdeaixa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-6 py-4 text-base font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-5 w-5" />
                Seguinos en Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577892680602&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-6 py-4 text-base font-semibold text-white hover:bg-[#1864D9] transition-colors mt-4"
              >
                <Facebook className="h-5 w-5 fill-current" />
                Seguinos en Facebook
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
