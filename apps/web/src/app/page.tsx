import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { TrendingProducts } from '@/components/sections/trending-products'
import { TrustIndicators } from '@/components/sections/trust-indicators'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <FeaturedCategories />
        <TrendingProducts />
        <TrustIndicators />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}