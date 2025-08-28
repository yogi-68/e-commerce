'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: "India's Favorite Shopping Destination",
    subtitle: "Discover millions of products with free delivery across India",
    cta: "Shop Now",
    href: "/categories",
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    bgColor: "from-saffron-600 to-saffron-800"
  },
  {
    id: 2,
    title: "Pay Your Way",
    subtitle: "UPI, Cards, NetBanking, Wallets & Cash on Delivery",
    cta: "Explore Payments",
    href: "/payment-options",
    bgImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    bgColor: "from-india-green to-green-700"
  },
  {
    id: 3,
    title: "GST Invoice & Easy Returns",
    subtitle: "Business-friendly shopping with proper documentation",
    cta: "Learn More",
    href: "/business-features",
    bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    bgColor: "from-blue-600 to-blue-800"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-r from-saffron-50 to-orange-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgColor} opacity-90`}
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl mb-8 text-white/90"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link href={heroSlides[currentSlide].href}>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {heroSlides[currentSlide].cta}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 text-white text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}