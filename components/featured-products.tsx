"use client"

import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const products = [
  {
    name: "Sustrato Premium Mix",
    description: "Mezcla profesional de turba, perlita y humus",
    price: 4500,
    originalPrice: 5200,
    rating: 4.9,
    reviews: 128,
    badge: "Más Vendido",
    image: "/products/sustrato.jpg",
  },
  {
    name: "LED Quantum Board 200W",
    description: "Iluminación de espectro completo para todas las etapas",
    price: 85000,
    originalPrice: null,
    rating: 5.0,
    reviews: 56,
    badge: "Premium",
    image: "/products/led.jpg",
  },
  {
    name: "Kit Nutrientes Completo",
    description: "Pack de fertilizantes para crecimiento y floración",
    price: 12500,
    originalPrice: 15000,
    rating: 4.8,
    reviews: 89,
    badge: "Oferta",
    image: "/products/nutrientes.jpg",
  },
  {
    name: "Maceta Air Pot 20L",
    description: "Maceta de poda aérea para raíces saludables",
    price: 3200,
    originalPrice: null,
    rating: 4.7,
    reviews: 45,
    badge: "Popular",
    image: "/products/maceta.jpg",
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <section id="productos" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 brand-pattern pointer-events-none opacity-[0.03]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-3">
              Destacados
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
              Productos más vendidos
            </h2>
          </div>
          
          {/* Navigation Arrows (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors"
              aria-label="Producto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors"
              aria-label="Siguiente producto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-4xl">🌱</span>
                  </div>
                </div>
                
                {/* Badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  product.badge === "Más Vendido" ? "bg-primary" :
                  product.badge === "Premium" ? "bg-accent" :
                  product.badge === "Oferta" ? "bg-secondary" :
                  "bg-primary/80"
                }`}>
                  {product.badge}
                </span>

                {/* Quick Add Button */}
                <button className="absolute bottom-4 right-4 p-3 rounded-full bg-primary text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:scale-110">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {products.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
