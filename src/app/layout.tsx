import type { Metadata } from 'next'
import { Fraunces, Montserrat } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dashboard — Copy que Vende',
  description: 'Análise de performance Meta Ads',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`h-full ${fraunces.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
