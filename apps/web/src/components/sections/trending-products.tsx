'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 134900,
    originalPrice: 139900,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1592286522717-e5fb4fecf6b3?w=400',
    discount: 4,
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 79999,
    originalPrice: 84999,
    rating: 4.6,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    discount: 6,
    badge: 'New Launch'
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    price: 1299,
    originalPrice: 1799,
    rating: 4.4,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    discount: 28,
    badge: 'Limited Time'
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    discount: 40,
    badge: 'Deal of the Day'
  }
]

export function TrendingProducts() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most popular products loved by millions of customers across India
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-saffron-500 text-white">
                  {product.badge}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {product.discount > 0 && (
                  <Badge variant="destructive" className="absolute bottom-2 left-2">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}