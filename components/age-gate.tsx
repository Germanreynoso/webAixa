"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "aixa-age-ok"

/** Aviso de mayoría de edad. Se muestra una vez por navegador. */
export function AgeGate() {
  // null hasta leer el storage en cliente: evita el parpadeo y el mismatch de hidratación.
  const [confirmed, setConfirmed] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setConfirmed(localStorage.getItem(STORAGE_KEY) === "1")
    } catch {
      setConfirmed(false)
    }
  }, [])

  // Bloquea el scroll del fondo mientras el aviso está abierto.
  useEffect(() => {
    if (confirmed !== false) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [confirmed])

  if (confirmed !== false) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* sin storage: se vuelve a preguntar en la próxima visita */
    }
    setConfirmed(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="w-full max-w-md bg-card border border-border rounded-sm p-6 sm:p-8 text-center shadow-2xl">
        <img src="/images/logo.jpeg" alt="El Grow de Aixa" className="h-20 w-20 mx-auto rounded-sm object-cover mb-5" />
        <h2 id="age-gate-title" className="text-2xl font-black uppercase tracking-tight text-foreground">
          ¿Sos mayor de 18 años?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Este sitio vende insumos para cultivo y es solo para personas mayores de edad.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={accept}
            autoFocus
            className="flex-1 py-3 px-5 bg-primary text-primary-foreground text-sm font-bold uppercase rounded-sm hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Soy mayor de 18
          </button>
          <a
            href="https://www.google.com"
            className="flex-1 py-3 px-5 border border-border text-foreground/80 text-sm font-bold uppercase rounded-sm hover:border-foreground/50 transition-colors"
          >
            Salir
          </a>
        </div>
      </div>
    </div>
  )
}
