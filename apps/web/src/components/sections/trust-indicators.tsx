'use client'

import { Shield, Truck, RotateCcw, CreditCard, Award, Users } from 'lucide-react'

const indicators = [
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Your payments are protected with bank-level security'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free shipping across India on orders above ₹499'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day return policy with doorstep pickup'
  },
  {
    icon: CreditCard,
    title: 'Multiple Payments',
    description: 'UPI, Cards, NetBanking, Wallets & COD available'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'All products are quality checked before dispatch'
  },
  {
    icon: Users,
    title: '10M+ Customers',
    description: 'Trusted by millions of happy customers'
  }
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-gradient-to-r from-saffron-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BharatMart?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            India's most trusted online shopping platform with unmatched service quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon
            return (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                    <IconComponent className="h-8 w-8 text-saffron-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {indicator.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {indicator.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}