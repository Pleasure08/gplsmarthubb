# GPL SmartHub

A student accommodation platform with marketplace features.

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Install dependencies
npm install

# Set up environment variables
npm run setup

# Test configuration
npm run test:config
```

### 2. Development

```bash
# Start development server
npm run dev
```

### 3. Production Deployment

1. Set up environment variables in Vercel dashboard
2. Deploy to Vercel
3. Test production configuration

## 🔧 Environment Configuration

### Development (.env.local)

Create a `.env.local` file with your development values:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=gplsmart@gplsmart.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-KEY-HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_development_spreadsheet_id

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Paystack Configuration
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Production (Vercel)

Set the following environment variables in your Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google service account email |
| `GOOGLE_PRIVATE_KEY` | Google private key (with real newlines) |
| `GOOGLE_SHEET_ID` | Google Sheets spreadsheet ID |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PAYSTACK_SECRET_KEY` | Paystack secret key |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key |
| `NEXTAUTH_SECRET` | NextAuth secret |
| `NEXTAUTH_URL` | Production URL |

## 🧪 Testing

```bash
# Test environment configuration
npm run test:env

# Test Google Sheets connection
npm run test:sheets

# Test all configurations
npm run test:config
```

## 📖 Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup` - Set up environment variables
- `npm run test:env` - Test environment configuration
- `npm run test:sheets` - Test Google Sheets connection
- `npm run test:config` - Test all configurations

## 🚨 Troubleshooting

### Common Issues

1. **403 Error in Production**
   - Check private key formatting in Vercel
   - Verify service account permissions
   - Ensure spreadsheet is shared with service account

2. **Missing Environment Variables**
   - Run `npm run test:env` to check configuration
   - Ensure `.env.local` exists for development
   - Check Vercel environment variables for production

3. **Private Key Format Issues**
   - Development: Use `\n` for newlines
   - Production: Use actual newlines in Vercel

For more detailed troubleshooting, see [SETUP.md](./SETUP.md). 