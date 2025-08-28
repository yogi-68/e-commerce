import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { config } from './config'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

// Import routes
import authRoutes from './routes/auth'
import catalogRoutes from './routes/catalog'
import cartRoutes from './routes/cart'
import orderRoutes from './routes/orders'
import paymentRoutes from './routes/payments'
import adminRoutes from './routes/admin'
import webhookRoutes from './routes/webhooks'

const app = express()

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS configuration
app.use(cors({
  origin: process.env.WEB_BASE_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '100'),
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', limiter)

// Special rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_AUTH_REQUESTS_PER_MINUTE || '5'),
  message: 'Too many authentication attempts',
})

// Logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV 
  })
})

// API routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/webhooks', webhookRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

const port = config.PORT || 3001

app.listen(port, () => {
  logger.info(`🚀 API server running on port ${port}`)
  logger.info(`📚 Environment: ${config.NODE_ENV}`)
  logger.info(`🔐 CORS origin: ${process.env.WEB_BASE_URL || 'http://localhost:3000'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  process.exit(0)
})

export default app