'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Search, ShoppingCart, Heart, User, Menu, X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LanguageSwitch } from '@/components/language-switch'
import { useCart } from '@/hooks/use-cart'

export function Header() {
  const t = useTranslations('header')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-saffron-500 text-white text-sm py-2">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Free delivery across India</span>
            </div>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">GST Invoice Available</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="hover:underline">
              Track Order
            </Link>
            <span className="hidden md:inline">|</span>
            <Link href="/customer-care" className="hover:underline">
              Customer Care: 1800-123-4567
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  <Link href="/categories/electronics" className="block text-lg font-medium hover:text-primary">
                    Electronics
                  </Link>
                  <Link href="/categories/fashion" className="block text-lg font-medium hover:text-primary">
                    Fashion
                  </Link>
                  <Link href="/categories/home-kitchen" className="block text-lg font-medium hover:text-primary">
                    Home & Kitchen
                  </Link>
                  <Link href="/categories/books" className="block text-lg font-medium hover:text-primary">
                    Books
                  </Link>
                  <Link href="/categories/beauty" className="block text-lg font-medium hover:text-primary">
                    Beauty & Personal Care
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-r from-saffron-500 to-india-green flex items-center justify-center text-white font-bold">
                BM
              </div>
              <span className="text-xl font-bold text-primary">BharatMart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/categories/electronics" className="text-sm font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link href="/categories/fashion" className="text-sm font-medium hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link href="/categories/home-kitchen" className="text-sm font-medium hover:text-primary transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/categories/books" className="text-sm font-medium hover:text-primary transition-colors">
              Books
            </Link>
            <Link href="/categories/beauty" className="text-sm font-medium hover:text-primary transition-colors">
              Beauty
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-4 py-2 w-full"
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <LanguageSwitch />

            <Link href="/account">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart ({cartItemCount} items)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-10 py-2 w-full"
                autoFocus
                aria-label="Search products"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}