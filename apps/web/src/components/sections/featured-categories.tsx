'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Smartphone, Shirt, Home, Book, Sparkles, Gamepad2 } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    itemCount: '10,000+ items'
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    itemCount: '25,000+ items'
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    itemCount: '15,000+ items'
  },
  {
    id: 4,
    name: 'Books',
    slug: 'books',
    icon: Book,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    itemCount: '50,000+ items'
  },
  {
    id: 5,
    name: 'Beauty',
    slug: 'beauty',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    itemCount: '8,000+ items'
  },
  {
    id: 6,
    name: 'Sports & Gaming',
    slug: 'sports-gaming',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    itemCount: '12,000+ items'
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover millions of products across all categories with the best prices in India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.itemCount}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}