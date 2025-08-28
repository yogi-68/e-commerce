import { z } from 'zod'

// Auth Types
export const LoginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  password: z.string().min(6),
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
})

export const RegisterSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
  phone: z.string().regex(/^[+]?[1-9]\d{9,14}$/).optional(),
  password: z.string().min(6),
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
})

export const OTPVerificationSchema = z.object({
  identifier: z.string(), // email or phone
  otp: z.string().length(6),
})

// Address Types
export const AddressSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(/^[+]?[91]?[6-9]\d{9}$/),
  addressLine1: z.string().min(5).max(100),
  addressLine2: z.string().max(100).optional(),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/), // Indian PIN format
  landmark: z.string().max(100).optional(),
  type: z.enum(['HOME', 'OFFICE', 'OTHER']).default('HOME'),
  isDefault: z.boolean().default(false),
})

// Product Types
export const ProductSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  brand: z.string().array().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(['popularity', 'price_low', 'price_high', 'rating', 'newest']).default('popularity'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export const ReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().max(100).optional(),
  comment: z.string().max(1000).optional(),
  images: z.string().array().max(5).optional(),
})

// Cart Types
export const CartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().min(1).max(10),
})

export const UpdateCartItemSchema = z.object({
  quantity: z.number().min(0).max(10),
})

// Order Types
export const CheckoutSchema = z.object({
  addressId: z.string(),
  paymentMethod: z.enum(['UPI', 'CARD', 'NETBANKING', 'WALLET', 'COD']),
  couponCode: z.string().optional(),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).optional(),
})

export const OrderStatusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED']),
  notes: z.string().optional(),
  trackingNumber: z.string().optional(),
})

// Payment Types
export const PaymentInitiateSchema = z.object({
  orderId: z.string(),
  paymentMethod: z.enum(['UPI', 'CARD', 'NETBANKING', 'WALLET']),
})

export const PaymentCallbackSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})

// Admin Types
export const ProductCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  shortDesc: z.string().max(200).optional(),
  categoryId: z.string(),
  brand: z.string().max(50).optional(),
  sku: z.string().min(2).max(50),
  hsn: z.string().max(8).optional(),
  weight: z.number().positive().optional(),
  dimensions: z.string().max(50).optional(),
  tags: z.string().array().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export const ProductVariantSchema = z.object({
  name: z.string().min(1).max(100),
  sku: z.string().min(2).max(50),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  stock: z.number().min(0),
  lowStockAlert: z.number().min(0).default(10),
  attributes: z.record(z.string()).default({}),
  isActive: z.boolean().default(true),
})

export const CouponCreateSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BUY_X_GET_Y']),
  value: z.number().positive(),
  minOrderValue: z.number().min(0).optional(),
  maxDiscountValue: z.number().positive().optional(),
  usageLimit: z.number().positive().optional(),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  applicableFor: z.string().array().optional(),
})

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
  errors: z.record(z.string()).optional(),
})

export const PaginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
})

// Webhook Types
export const RazorpayWebhookSchema = z.object({
  entity: z.string(),
  account_id: z.string(),
  event: z.string(),
  contains: z.array(z.string()),
  payload: z.object({
    payment: z.object({
      entity: z.object({
        id: z.string(),
        entity: z.string(),
        amount: z.number(),
        currency: z.string(),
        status: z.string(),
        order_id: z.string(),
        method: z.string(),
        captured: z.boolean(),
        fee: z.number().optional(),
        tax: z.number().optional(),
        error_code: z.string().optional(),
        error_description: z.string().optional(),
        created_at: z.number(),
      }),
    }).optional(),
    order: z.object({
      entity: z.object({
        id: z.string(),
        entity: z.string(),
        amount: z.number(),
        currency: z.string(),
        status: z.string(),
        created_at: z.number(),
      }),
    }).optional(),
  }),
  created_at: z.number(),
})

// Utility Types
export const PinValidationSchema = z.object({
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid PIN code format"),
})

export const GSTPanValidationSchema = z.object({
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number format"),
})

// Export types
export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type OTPVerificationInput = z.infer<typeof OTPVerificationSchema>
export type AddressInput = z.infer<typeof AddressSchema>
export type ProductSearchInput = z.infer<typeof ProductSearchSchema>
export type ReviewInput = z.infer<typeof ReviewSchema>
export type CartItemInput = z.infer<typeof CartItemSchema>
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>
export type CheckoutInput = z.infer<typeof CheckoutSchema>
export type OrderStatusUpdateInput = z.infer<typeof OrderStatusUpdateSchema>
export type PaymentInitiateInput = z.infer<typeof PaymentInitiateSchema>
export type PaymentCallbackInput = z.infer<typeof PaymentCallbackSchema>
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>
export type ProductVariantInput = z.infer<typeof ProductVariantSchema>
export type CouponCreateInput = z.infer<typeof CouponCreateSchema>
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & { data?: T }
export type PaginatedResponse<T = any> = z.infer<typeof PaginatedResponseSchema> & { data: T[] }
export type RazorpayWebhook = z.infer<typeof RazorpayWebhookSchema>