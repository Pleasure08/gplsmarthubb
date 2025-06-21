# Environment Configuration Setup Guide

This guide will help you set up environment variables for both development and production environments.

## 🚀 Quick Start

### 1. Development Environment (.env.local)

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp env.example .env.local
```

Then edit `.env.local` with your actual development values:

```env
# Google Sheets Configuration (Development)
GOOGLE_SERVICE_ACCOUNT_EMAIL=gplsmart@gplsmart.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-DEV-PRIVATE-KEY-HERE\n-----END PRIVATE KEY-----\n"
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

### 2. Production Environment (Vercel)

In your Vercel dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables for **Production** environment:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `gplsmart@gplsmart.iam.gserviceaccount.com` | Production |
| `GOOGLE_PRIVATE_KEY` | Your production private key (with real newlines) | Production |
| `GOOGLE_SHEET_ID` | Your production spreadsheet ID | Production |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Production |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Production |
| `PAYSTACK_SECRET_KEY` | Your Paystack secret key | Production |
| `PAYSTACK_PUBLIC_KEY` | Your Paystack public key | Production |
| `NEXTAUTH_SECRET` | Your NextAuth secret | Production |
| `NEXTAUTH_URL` | Your production URL | Production |

## 🔧 Important Notes

### Google Private Key Formatting

**For Development (.env.local):**
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-KEY-HERE\n-----END PRIVATE KEY-----\n"
```

**For Production (Vercel):**
```
-----BEGIN PRIVATE KEY-----
YOUR-KEY-HERE
-----END PRIVATE KEY-----
```

**Key Differences:**
- Development: Use `\n` for newlines
- Production: Use actual newlines (no `\n`)

### Environment Detection

The application automatically detects the environment:
- **Development**: `NODE_ENV=development` (local development)
- **Production**: `NODE_ENV=production` (Vercel deployment)

## 🧪 Testing Configuration

### 1. Test Environment Variables

Run the test script to verify your configuration:

```bash
node env-test.js
```

### 2. Test Google Sheets Connection

```bash
node test-sheet.js
```

### 3. Check Configuration Status

The application will automatically log configuration status when making API calls. Look for:

```
🔧 Environment Configuration Status:
   Environment: Development/Production
   Configuration Valid: ✅/❌
   Google Sheets:
     Service Account Email: ✅ Set
     Private Key: ✅ Set
     Sheet ID: ✅ Set
```

## 🚨 Troubleshooting

### Common Issues

1. **403 Error in Production**
   - Check if private key is properly formatted in Vercel
   - Ensure service account has correct permissions
   - Verify spreadsheet ID is correct

2. **Missing Environment Variables**
   - Run `node env-test.js` to check what's missing
   - Ensure `.env.local` exists for development
   - Check Vercel environment variables for production

3. **Private Key Format Issues**
   - Development: Use `\n` for newlines
   - Production: Use actual newlines in Vercel

### Debug Mode

The application includes comprehensive logging. Check your console/logs for:

- Environment detection
- Configuration validation
- API connection status
- Error details

## 📁 File Structure

```
├── .env.local          # Development environment (gitignored)
├── env.example         # Example configuration
├── lib/
│   ├── config.ts       # Configuration utility
│   ├── google-sheets.ts # Updated Google Sheets integration
│   └── cloudinary.ts   # Updated Cloudinary integration
├── env-test.js         # Environment variable test
└── test-sheet.js       # Google Sheets connection test
```

## 🔄 Migration from Old Setup

If you're migrating from the old setup:

1. **Backup your current `.env.local`** (if it exists)
2. **Update Vercel environment variables** with the new format
3. **Test the configuration** using the provided test scripts
4. **Deploy and verify** that everything works in production

## 📞 Support

If you encounter issues:

1. Check the console logs for detailed error messages
2. Run the test scripts to verify configuration
3. Ensure environment variables are properly set in both development and production
4. Verify that the Google service account has the correct permissions 