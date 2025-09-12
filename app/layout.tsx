import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'CIS[HACK] UNI',
  description: 'Creado por Joseph Chuquipiondo & Eduardo Villegas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.postimg.cc/PqYBWw7b/LOGO-CIS-UNI-SIN-FONDO.png" />
        <link rel="shortcut icon" href="https://i.postimg.cc/PqYBWw7b/LOGO-CIS-UNI-SIN-FONDO.png" />
        <link rel="apple-touch-icon" href="https://i.postimg.cc/PqYBWw7b/LOGO-CIS-UNI-SIN-FONDO.png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
