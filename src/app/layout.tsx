import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'BSS Nexus - Bee Swarm Simulator Trading Hub',
    template: '%s | BSS Nexus',
  },
  description:
    'The ultimate trading companion for Bee Swarm Simulator. Track item values, calculate fair trades, build your perfect hive, and get AI-powered trading advice.',
  keywords: [
    'Bee Swarm Simulator',
    'BSS',
    'trading',
    'value list',
    'calculator',
    'hive builder',
    'Roblox',
    'stickers',
    'beequips',
  ],
  authors: [{ name: 'BSS Nexus' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://beeswarmsimulator.org',
    siteName: 'BSS Nexus',
    title: 'BSS Nexus - Bee Swarm Simulator Trading Hub',
    description:
      'The ultimate trading companion for Bee Swarm Simulator. Track values, calculate trades, and build the perfect hive.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BSS Nexus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BSS Nexus - Bee Swarm Simulator Trading Hub',
    description:
      'The ultimate trading companion for Bee Swarm Simulator.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="bss-nexus-theme">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
