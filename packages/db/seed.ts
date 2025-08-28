import { PrismaClient, UserRole, OrderStatus, PaymentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.translation.deleteMany()
  await prisma.translationKey.deleteMany()
  await prisma.language.deleteMany()
  await prisma.orderStatusHistory.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.refund.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.productReview.deleteMany()
  await prisma.productAttribute.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.inventoryLedger.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.attribute.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.serviceablePin.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.banner.deleteMany()

  // Create languages
  const english = await prisma.language.create({
    data: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      isActive: true,
      isDefault: true,
    },
  })

  const hindi = await prisma.language.create({
    data: {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      isActive: true,
      isDefault: false,
    },
  })

  // Create translation keys and translations
  const translationKeys = [
    {
      key: 'header.welcome',
      defaultText: 'Welcome to BharatMart',
      translations: {
        en: 'Welcome to BharatMart',
        hi: 'भारतमार्ट में आपका स्वागत है',
      },
    },
    {
      key: 'common.search',
      defaultText: 'Search',
      translations: {
        en: 'Search',
        hi: 'खोजें',
      },
    },
    {
      key: 'common.cart',
      defaultText: 'Cart',
      translations: {
        en: 'Cart',
        hi: 'कार्ट',
      },
    },
  ]

  for (const item of translationKeys) {
    const translationKey = await prisma.translationKey.create({
      data: {
        key: item.key,
        defaultText: item.defaultText,
      },
    })

    await prisma.translation.create({
      data: {
        languageId: english.id,
        translationKeyId: translationKey.id,
        text: item.translations.en,
      },
    })

    await prisma.translation.create({
      data: {
        languageId: hindi.id,
        translationKeyId: translationKey.id,
        text: item.translations.hi,
      },
    })
  }

  // Create serviceable pincodes (major Indian cities)
  const serviceablePins = [
    { pincode: '110001', city: 'New Delhi', state: 'Delhi' },
    { pincode: '400001', city: 'Mumbai', state: 'Maharashtra' },
    { pincode: '560001', city: 'Bangalore', state: 'Karnataka' },
    { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu' },
    { pincode: '700001', city: 'Kolkata', state: 'West Bengal' },
    { pincode: '500001', city: 'Hyderabad', state: 'Telangana' },
    { pincode: '411001', city: 'Pune', state: 'Maharashtra' },
    { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat' },
    { pincode: '302001', city: 'Jaipur', state: 'Rajasthan' },
    { pincode: '800001', city: 'Patna', state: 'Bihar' },
  ]

  for (const pin of serviceablePins) {
    await prisma.serviceablePin.create({
      data: {
        ...pin,
        isCodAvailable: true,
        deliveryDays: 3,
        isActive: true,
      },
    })
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@bharatmart.com',
      phone: '+919876543210',
      name: 'Admin User',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  })

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      phone: '+919876543211',
      name: 'Test User',
      role: UserRole.USER,
      isVerified: true,
    },
  })

  // Create address for test user
  await prisma.address.create({
    data: {
      userId: testUser.id,
      name: 'Test User',
      phone: '+919876543211',
      addressLine1: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true,
      type: 'HOME',
    },
  })

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest electronic gadgets and appliances',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      sortOrder: 1,
    },
  })

  const smartphones = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Latest smartphones from top brands',
      parentId: electronics.id,
      sortOrder: 1,
    },
  })

  const fashion = await prisma.category.create({
    data: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      sortOrder: 2,
    },
  })

  const home = await prisma.category.create({
    data: {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      description: 'Everything for your home and kitchen',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      sortOrder: 3,
    },
  })

  // Create attributes
  const colorAttr = await prisma.attribute.create({
    data: {
      name: 'Color',
      type: 'SELECT',
      values: ['Red', 'Blue', 'Green', 'Black', 'White', 'Silver', 'Gold'],
      categories: {
        connect: [{ id: electronics.id }, { id: fashion.id }],
      },
    },
  })

  const sizeAttr = await prisma.attribute.create({
    data: {
      name: 'Size',
      type: 'SELECT',
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      categories: {
        connect: [{ id: fashion.id }],
      },
    },
  })

  // Create sample products
  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'The most advanced iPhone yet with A17 Pro chip and titanium design.',
      shortDesc: 'Latest iPhone with Pro features',
      sku: 'IPH15PRO',
      hsn: '85171200',
      brand: 'Apple',
      categoryId: smartphones.id,
      isFeatured: true,
      weight: 187,
      dimensions: '14.67 x 7.07 x 0.83',
      tags: ['smartphone', 'apple', 'premium', '5g'],
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1592286522717-e5fb4fecf6b3?w=800',
            altText: 'iPhone 15 Pro front view',
            sortOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
            altText: 'iPhone 15 Pro back view',
            sortOrder: 2,
          },
        ],
      },
      variants: {
        create: [
          {
            name: 'Natural Titanium - 128GB',
            sku: 'IPH15PRO-NT-128',
            price: 134900,
            comparePrice: 139900,
            stock: 50,
            attributes: { color: 'Natural Titanium', storage: '128GB' },
          },
          {
            name: 'Blue Titanium - 256GB',
            sku: 'IPH15PRO-BT-256',
            price: 144900,
            comparePrice: 149900,
            stock: 30,
            attributes: { color: 'Blue Titanium', storage: '256GB' },
          },
        ],
      },
    },
  })

  const tshirt = await prisma.product.create({
    data: {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-tshirt',
      description: 'Comfortable premium cotton t-shirt for everyday wear.',
      shortDesc: 'Premium cotton t-shirt',
      sku: 'TSHIRT001',
      hsn: '61091000',
      brand: 'StyleCo',
      categoryId: fashion.id,
      isFeatured: true,
      weight: 200,
      tags: ['tshirt', 'cotton', 'casual', 'fashion'],
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
            altText: 'Premium Cotton T-Shirt',
            sortOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          {
            name: 'Blue - Medium',
            sku: 'TSHIRT001-BL-M',
            price: 1299,
            comparePrice: 1799,
            stock: 100,
            attributes: { color: 'Blue', size: 'M' },
          },
          {
            name: 'Red - Large',
            sku: 'TSHIRT001-RD-L',
            price: 1299,
            comparePrice: 1799,
            stock: 80,
            attributes: { color: 'Red', size: 'L' },
          },
        ],
      },
    },
  })

  // Create sample reviews
  await prisma.productReview.create({
    data: {
      productId: iphone.id,
      userId: testUser.id,
      rating: 5,
      title: 'Excellent Phone!',
      comment: 'Amazing performance and camera quality. Worth every penny!',
      isVerified: true,
    },
  })

  // Create sample coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 500,
      maxDiscountValue: 1000,
      usageLimit: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      isActive: true,
    },
  })

  // Create sample banners
  await prisma.banner.create({
    data: {
      title: 'Festival Sale - Up to 70% Off',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      link: '/categories/electronics',
      position: 'hero',
      sortOrder: 1,
      isActive: true,
      validFrom: new Date(),
    },
  })

  // Create sample orders
  const order = await prisma.order.create({
    data: {
      orderNumber: 'BM2024001',
      userId: testUser.id,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.CAPTURED,
      paymentMethod: 'UPI',
      subtotal: 1299,
      taxAmount: 234,
      shippingAmount: 0,
      totalAmount: 1533,
      shippingAddressId: (await prisma.address.findFirst({ where: { userId: testUser.id } }))!.id,
      cgst: 117,
      sgst: 117,
      igst: 0,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          {
            productId: tshirt.id,
            variantId: (await prisma.productVariant.findFirst({ where: { productId: tshirt.id } }))!.id,
            quantity: 1,
            price: 1299,
            tax: 234,
            total: 1533,
          },
        ],
      },
    },
  })

  // Create payment record
  await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: 'RAZORPAY',
      method: 'UPI',
      status: PaymentStatus.CAPTURED,
      amount: 1533,
      currency: 'INR',
    },
  })

  // Add some inventory ledger entries
  const variants = await prisma.productVariant.findMany()
  for (const variant of variants) {
    await prisma.inventoryLedger.create({
      data: {
        variantId: variant.id,
        type: 'PURCHASE',
        quantity: variant.stock,
        reference: 'INITIAL_STOCK',
        notes: 'Initial stock entry',
      },
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`📊 Created:`)
  console.log(`  - 2 Languages (EN, HI)`)
  console.log(`  - ${serviceablePins.length} Serviceable PIN codes`)
  console.log(`  - 2 Users (1 Admin, 1 Customer)`)
  console.log(`  - 4 Categories`)
  console.log(`  - 2 Products with variants`)
  console.log(`  - 1 Sample order`)
  console.log(`  - 1 Coupon`)
  console.log(`  - 1 Banner`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })