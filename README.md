# Indian E-Commerce Platform

A comprehensive, production-grade e-commerce platform specifically designed for the Indian market with support for local payment methods, GST compliance, PIN code validation, and multilingual support.

## 🚀 Features

### Customer Features
- **Multi-language Support**: English and Hindi with easy language switching
- **Indian Payment Methods**: UPI, Cards (RuPay/Visa/Mastercard), Net Banking, Wallets, and Cash on Delivery
- **Location Services**: PIN code validation and serviceability check for Indian addresses
- **GST Compliance**: Proper tax calculation and invoice generation with CGST/SGST/IGST
- **Responsive Design**: Mobile-first design optimized for Indian users
- **Guest Checkout**: Shop without registration with seamless upgrade to account
- **Wishlist & Cart**: Persistent across sessions with real-time synchronization
- **Order Tracking**: Real-time status updates from placement to delivery
- **Product Reviews**: Verified purchase reviews with photo uploads
- **Search & Filters**: Advanced filtering by price, brand, rating, availability

### Business Features
- **Admin Dashboard**: Comprehensive analytics and management tools
- **Inventory Management**: Stock tracking with low-stock alerts
- **Order Management**: Complete order lifecycle with status updates
- **GST Invoicing**: Automated GST calculation and PDF invoice generation
- **Coupon System**: Flexible discount codes and promotional offers
- **User Management**: Customer support and user administration
- **Analytics**: Sales reports, conversion tracking, and business insights

### Technical Features
- **Monorepo Architecture**: Organized with pnpm workspaces
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for sessions, rate limiting, and data caching
- **Security**: RBAC, rate limiting, input sanitization, and PCI compliance
- **Performance**: Edge caching, image optimization, and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **SEO**: Structured data, meta tags, and sitemap generation

## 🏗️ Architecture

```
apps/
  ├── web/                 # Next.js 14 frontend
  └── api/                 # Node.js + Express API

packages/
  ├── ui/                  # Shared UI components
  ├── types/               # Zod schemas and TypeScript types
  ├── utils/               # Shared utilities
  ├── db/                  # Prisma schema and migrations
  ├── i18n/                # Internationalization configuration
  └── config/              # Shared configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Framer Motion** for animations
- **React Query** for data fetching
- **Zustand** for state management
- **next-intl** for internationalization

### Backend
- **Node.js** with Express
- **PostgreSQL** with Prisma ORM
- **Redis** for caching and sessions
- **JWT** for authentication
- **Zod** for validation
- **Winston** for logging

### Payment & Services
- **Razorpay** for payments (primary)
- **MSG91** for SMS OTP
- **AWS SES** for emails
- **AWS S3** for file storage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 13+
- Redis 6+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs

## 📦 Environment Setup

### Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/indian_ecommerce"
REDIS_URL="redis://localhost:6379"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-webhook-secret"

# SMS Service (MSG91)
MSG91_API_KEY="your-msg91-api-key"

# Email Service (AWS SES)
EMAIL_SERVER_HOST="email-smtp.ap-south-1.amazonaws.com"
EMAIL_SERVER_USER="your-ses-user"
EMAIL_SERVER_PASSWORD="your-ses-password"

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
S3_BUCKET="your-s3-bucket"
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Run accessibility tests
pnpm test:a11y
```

## 📱 Indian Market Features

### Payment Methods
- **UPI**: Intent and collect flows with major UPI apps
- **Cards**: RuPay, Visa, Mastercard, American Express
- **Net Banking**: 50+ Indian banks supported
- **Wallets**: Paytm, PhonePe, Amazon Pay, and more
- **Cash on Delivery**: Available for verified PIN codes

### Compliance
- **GST**: Automatic tax calculation based on customer location
- **Invoice**: PDF generation with proper GST formatting
- **PIN Validation**: India Post database integration
- **Legal**: Privacy policy and terms compliant with Indian laws

### Localization
- **Languages**: English and Hindi with easy switching
- **Currency**: INR formatting with Indian number system
- **Address**: Indian address format with PIN code validation
- **Cultural**: Festivals, occasions, and local preferences

## 🚀 Deployment

### Development
```bash
docker-compose up -d  # Start PostgreSQL and Redis
pnpm dev             # Start development servers
```

### Production

#### Frontend (Vercel)
```bash
vercel --prod
```

#### API (AWS ECS)
```bash
docker build -t indian-ecommerce-api .
# Deploy to ECS using your preferred method
```

#### Database (AWS RDS)
- Use PostgreSQL 13+ on RDS
- Enable automated backups
- Configure read replicas for scaling

## 🔒 Security Features

- **Authentication**: Multi-factor with SMS OTP
- **Authorization**: Role-based access control (RBAC)
- **Payment Security**: PCI DSS compliance
- **Data Protection**: Encryption at rest and in transit
- **Rate Limiting**: API and authentication endpoints
- **Input Validation**: Comprehensive Zod schemas
- **Security Headers**: Helmet.js configuration
- **CSRF Protection**: Cross-site request forgery prevention

## 📊 Performance

- **Lighthouse Scores**: 90+ on all metrics
- **Core Web Vitals**: Optimized for mobile users
- **Caching Strategy**: Redis + Edge caching
- **Image Optimization**: Next.js Image with sharp
- **Code Splitting**: Route-based and component-based
- **Database**: Optimized queries with proper indexing

## 🌐 Internationalization

- **Languages**: English (default) and Hindi
- **Content**: All UI text translated and localized
- **Numbers**: Indian numbering system (lakhs, crores)
- **Dates**: Indian date formats and calendars
- **Currency**: INR with proper symbol placement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian postal service for PIN code data
- Razorpay for payment gateway APIs
- Open source community for tools and libraries
- Contributors and maintainers

## 📞 Support

For support and queries:
- **Email**: support@bharatmart.com
- **Phone**: 1800-123-4567
- **Documentation**: [docs.bharatmart.com](https://docs.bharatmart.com)
- **GitHub Issues**: [Create an issue](https://github.com/your-repo/issues)

---

Made with ❤️ for India 🇮🇳