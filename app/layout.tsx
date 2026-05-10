import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'El Grow de Aixa | Todo para tu cultivo',
  description: 'Productos premium para tu cultivo de plantas. Sustratos, semillas, iluminación, nutrientes y más. Envíos a toda Tucumán. Concepción, Tucumán.',
  keywords: ['growshop', 'cultivo', 'sustratos', 'semillas', 'iluminación', 'nutrientes', 'tucumán', 'concepción'],
  authors: [{ name: 'El Grow de Aixa' }],
  generator: 'v0.app',
  openGraph: {
    title: 'El Grow de Aixa | Todo para tu cultivo',
    description: 'Productos premium para tu cultivo de plantas. Envíos a toda Tucumán.',
    type: 'website',
    locale: 'es_AR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#D20480',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
