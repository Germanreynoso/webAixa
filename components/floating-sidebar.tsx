"use client"

import { Truck, DollarSign, Settings2, Bookmark } from "lucide-react"

export function FloatingSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1">
      <button className="w-12 h-12 bg-secondary text-white flex flex-col items-center justify-center hover:bg-secondary-dark transition-colors group relative">
        <Truck className="h-5 w-5" />
        <span className="text-[9px] font-bold mt-0.5">Envíos</span>
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Costos de envío
        </div>
      </button>
      <button className="w-12 h-12 bg-secondary text-white flex flex-col items-center justify-center hover:bg-secondary-dark transition-colors group relative">
        <DollarSign className="h-5 w-5" />
        <span className="text-[9px] font-bold mt-0.5">Precio</span>
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Rango de precio
        </div>
      </button>
      <button className="w-12 h-12 bg-secondary text-white flex flex-col items-center justify-center hover:bg-secondary-dark transition-colors group relative">
        <Settings2 className="h-5 w-5" />
        <span className="text-[9px] font-bold mt-0.5">Filtro</span>
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Filtrar productos
        </div>
      </button>
      <button className="w-12 h-12 bg-secondary text-white flex flex-col items-center justify-center hover:bg-secondary-dark transition-colors group relative">
        <Bookmark className="h-5 w-5" />
        <span className="text-[9px] font-bold mt-0.5">Marca</span>
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Buscar por marca
        </div>
      </button>
    </div>
  )
}
