import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/components/query-provider'
import { CartProvider } from '@/components/cart-provider'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'BharatMart - India\'s Premier Online Shopping Destination',
  description: 'Shop the best products online in India with free delivery, easy returns, and secure payments. GST compliant shopping with UPI, cards, and COD.',
  keywords: 'online shopping India, e-commerce, UPI payments, GST invoice, free delivery, Indian marketplace',
  authors: [{ name: 'BharatMart Team' }],
  creator: 'BharatMart',
  publisher: 'BharatMart',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    url: process.env.WEB_BASE_URL,
    title: 'BharatMart - India\'s Premier Online Shopping Destination',
    description: 'Shop the best products online in India with free delivery, easy returns, and secure payments.',
    siteName: 'BharatMart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BharatMart - India\'s Premier Online Shopping Destination',
    description: 'Shop the best products online in India with free delivery, easy returns, and secure payments.',
    creator: '@bharatmart',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#FF9933',
    'theme-color': '#FF9933',
  },
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarnings>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.variable}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <QueryProvider>
                <CartProvider>
                  {children}
                  <Toaster />
                </CartProvider>
              </QueryProvider>
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}