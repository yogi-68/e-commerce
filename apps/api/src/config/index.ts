import { z } from 'zod'

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('24h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  // AWS
  AWS_REGION: z.string().default('ap-south-1'),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  
  // Email
  EMAIL_FROM: z.string().email().default('noreply@bharatmart.com'),
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.coerce.number().optional(),
  EMAIL_SERVER_USER: z.string().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  
  // SMS
  MSG91_API_KEY: z.string().optional(),
  MSG91_SENDER_ID: z.string().default('BHARATMART'),
  
  // Payments
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),
  RAZORPAY_WEBHOOK_SECRET: z.string(),
  
  // Feature Flags
  ENABLE_PAYTM: z.string().default('false').transform(val => val === 'true'),
  ENABLE_CCAVENUE: z.string().default('false').transform(val => val === 'true'),
  ENABLE_WHATSAPP_COMMERCE: z.string().default('false').transform(val => val === 'true'),
})

const parseConfig = () => {
  try {
    return configSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid environment configuration:')
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

export const config = parseConfig()