# 🚀 Production Launch Checklist

This is your **final checklist** for launching GPL SmartHub to production.

## ✅ **Step 1: Environment Variables Setup**

### 🔑 **Vercel Dashboard Configuration**

Go to **Vercel Dashboard → Project Settings → Environment Variables** and add these:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `gplsmart@gplsmart.iam.gserviceaccount.com` | Production |
| `GOOGLE_PRIVATE_KEY` | Your private key with real newlines | Production |
| `GOOGLE_SHEET_ID` | Your production spreadsheet ID | Production |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | Production |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | Production |
| `PAYSTACK_SECRET_KEY` | Your Paystack live secret key | Production |
| `PAYSTACK_PUBLIC_KEY` | Your Paystack live public key | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://gplsmarthub.com.ng` | Production |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Your secure admin password | Production |
| `NEXTAUTH_SECRET` | Generated secret (32 chars) | Production |
| `NEXTAUTH_URL` | `https://gplsmarthub.com.ng` | Production |

### ⚠️ **Critical Notes**

1. **Google Private Key**: Use real newlines, NOT `\n`
2. **Paystack Keys**: Use LIVE keys, not test keys
3. **Environment**: Set for "Production" environment
4. **NEXTAUTH_SECRET**: Generate with `openssl rand -hex 32`

## ✅ **Step 2: Pre-Deployment Checks**

Run these commands locally:

```bash
# Check production readiness
npm run deploy:ready

# Check deployment status
npm run deploy:check

# Test configuration
npm run test:config
```

## ✅ **Step 3: Deploy to Production**

```bash
# Commit all changes
git add .
git commit -m "Production deployment ready"

# Push to trigger Vercel deployment
git push origin main
```

## ✅ **Step 4: Monitor Deployment**

1. **Watch Vercel Dashboard** for deployment progress
2. **Check Build Logs** for any errors
3. **Monitor Function Logs** for API issues

## ✅ **Step 5: Post-Deployment Testing**

### 🌐 **Website Testing**

Visit `https://gplsmarthub.com.ng` and test:

- [ ] **Homepage loads correctly**
- [ ] **Marketplace items display**
- [ ] **Image uploads work**
- [ ] **Google Sheets integration**
- [ ] **Payment flow (Paystack)**
- [ ] **Admin access works**

### 🔍 **API Testing**

Test these endpoints:

- [ ] `GET /api/hostels` - Hostel listings
- [ ] `GET /api/marketplace` - Marketplace items
- [ ] `POST /api/marketplace/upload` - Item upload
- [ ] `GET /api/settings` - Settings retrieval

### 📊 **Log Monitoring**

Check Vercel logs for:

```
✅ Environment Configuration Status:
✅ Google Sheets connected
✅ Cloudinary configured
✅ Paystack configured
```

## ✅ **Step 6: Production Verification**

### 🔧 **Configuration Verification**

Look for these log messages in Vercel:

```
🔧 Environment Configuration Status:
   Environment: Production
   Configuration Valid: ✅
   Google Sheets: ✅ Set
   Cloudinary: ✅ Set
   Paystack: ✅ Set
```

### 🚨 **Error Monitoring**

Watch for these common issues:

1. **403 Errors**: Check Google Sheets permissions
2. **Image Upload Failures**: Verify Cloudinary config
3. **Payment Errors**: Check Paystack live keys
4. **Admin Access Issues**: Verify admin password

## ✅ **Step 7: Final Validation**

### 📋 **Functionality Checklist**

- [ ] **User Registration/Login** works
- [ ] **Marketplace Item Creation** works
- [ ] **Image Upload** to Cloudinary works
- [ ] **Google Sheets Data Sync** works
- [ ] **Payment Processing** works
- [ ] **Admin Dashboard** accessible
- [ ] **Email Notifications** (if configured)
- [ ] **Mobile Responsiveness** works

### 🔒 **Security Verification**

- [ ] **Environment variables** not exposed in client
- [ ] **Admin routes** properly protected
- [ ] **API endpoints** properly secured
- [ ] **File uploads** properly validated

## 🚨 **Troubleshooting Guide**

### **Common Issues & Solutions**

#### **403 Google Sheets Error**
```bash
# Check service account permissions
# Verify spreadsheet sharing
# Test with: npm run test:sheets
```

#### **Image Upload Failures**
```bash
# Verify Cloudinary credentials
# Check file size limits
# Test upload functionality
```

#### **Payment Processing Issues**
```bash
# Verify Paystack live keys
# Check webhook configuration
# Test payment flow
```

#### **Admin Access Problems**
```bash
# Verify NEXT_PUBLIC_ADMIN_PASSWORD
# Check admin route protection
# Test admin functionality
```

## 📞 **Support Resources**

- **Vercel Documentation**: https://vercel.com/docs
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Cloudinary Documentation**: https://cloudinary.com/documentation
- **Paystack Documentation**: https://paystack.com/docs

## 🎯 **Success Criteria**

Your production deployment is successful when:

1. ✅ All environment variables are set correctly
2. ✅ Website loads without errors
3. ✅ All core functionality works
4. ✅ No critical errors in Vercel logs
5. ✅ Performance is acceptable
6. ✅ Security measures are in place

## 🚀 **Launch Complete!**

Once all checks pass, your GPL SmartHub is **LIVE** and ready for users!

---

**Need help?** Check the logs, run the test scripts, and refer to the troubleshooting guide above. 