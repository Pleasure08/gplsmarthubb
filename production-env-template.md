# Production Environment Variables Template for Vercel

Copy these exact keys and paste your real values in Vercel Dashboard → Project Settings → Environment Variables

## 🔑 Required Environment Variables

| Key | Value | Notes |
|-----|-------|-------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `gplsmart@gplsmart.iam.gserviceaccount.com` | Your Google service account email |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----`<br>`YOUR-ACTUAL-PRIVATE-KEY-HERE`<br>`-----END PRIVATE KEY-----` | **IMPORTANT**: Use real newlines, NOT \n |
| `GOOGLE_SHEET_ID` | `your-production-spreadsheet-id` | Your production Google Sheet ID |
| `CLOUDINARY_CLOUD_NAME` | `your-cloudinary-cloud-name` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | `your-cloudinary-api-key` | From Cloudinary account |
| `CLOUDINARY_API_SECRET` | `your-cloudinary-api-secret` | From Cloudinary account |
| `PAYSTACK_SECRET_KEY` | `sk_live_...` | From Paystack dashboard (LIVE key) |
| `PAYSTACK_PUBLIC_KEY` | `pk_live_...` | From Paystack dashboard (LIVE key) |
| `NEXT_PUBLIC_BASE_URL` | `https://gplsmarthub.com.ng` | Your production domain |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `your-secure-admin-password` | Admin access password |
| `NEXTAUTH_SECRET` | `generated-32-char-secret` | Generate with: `openssl rand -hex 32` |
| `NEXTAUTH_URL` | `https://gplsmarthub.com.ng` | Your production domain |

## ⚠️ Critical Notes

### Google Private Key Formatting
**DO NOT** use `\n` in Vercel. Instead:
1. Copy your private key from the JSON file
2. Paste it directly into Vercel
3. Make sure it has real line breaks (press Enter)

### Environment Selection
- Set all variables for **Production** environment
- You can also set them for **Preview** if you want to test on preview deployments

### Security
- Never commit these values to Git
- Use Vercel's encrypted environment variables
- Rotate keys regularly

## 🧪 Testing After Setup

After setting these variables:
1. Deploy to Vercel
2. Check Vercel logs for configuration status
3. Test all functionality on live site 