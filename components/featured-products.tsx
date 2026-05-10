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
    <section id="productos" className="relative py-12 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            PRODUCTOS <span className="text-primary">DESTACADOS</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mt-2" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.concat(products).slice(0, 6).map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                {/* Placeholder Icon */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100/50 rounded-sm group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl">🌱</span>
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white ${
                    product.badge === "Más Vendido" ? "bg-primary" :
                    product.badge === "Premium" ? "bg-accent" :
                    product.badge === "Oferta" ? "bg-secondary" :
                    "bg-primary/80"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col items-center text-center flex-grow">
                {/* Name */}
                <h3 className="text-xs font-bold text-gray-800 mb-1 line-clamp-2 min-h-[2rem]">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Price */}
                <div className="mt-auto">
                  <span className="text-sm font-black text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full py-2 bg-secondary text-white text-[10px] font-bold uppercase hover:bg-secondary-dark transition-colors mt-2 flex items-center justify-center gap-2">
                <ShoppingCart className="h-3 w-3" />
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
