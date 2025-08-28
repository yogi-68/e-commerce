'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Gift } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-gradient-to-r from-saffron-500 to-saffron-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6">
            <Gift className="h-16 w-16 mx-auto mb-4 text-white/90" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Exclusive Deals & Updates
          </h2>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about flash sales, 
            new arrivals, and special offers just for you!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white text-gray-900 border-0 h-12"
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="bg-white text-saffron-600 hover:bg-gray-100 font-semibold px-8"
              >
                Subscribe
              </Button>
            </div>
          </form>

          <p className="text-sm text-white/70 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">10M+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-white/80">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-white/80">Cities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}