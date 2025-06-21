#!/usr/bin/env node

import { getConfig, validateConfig, logConfigStatus } from '../lib/config.js';

console.log('🔍 Production Readiness Check');
console.log('=============================\n');

// Check configuration
console.log('📋 Configuration Status:');
console.log('========================');
const config = getConfig();
const validation = validateConfig();

logConfigStatus();

// Environment-specific checks
console.log('\n🌍 Environment Detection:');
console.log('========================');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'Not set'}`);
console.log(`Is Production: ${config.isProduction ? 'Yes' : 'No'}`);
console.log(`Is Development: ${config.isDevelopment ? 'Yes' : 'No'}`);

// Check for production-specific requirements
console.log('\n🚀 Production Requirements:');
console.log('==========================');

const productionChecks = [
  {
    name: 'Google Sheets Configuration',
    check: () => {
      const hasEmail = !!config.google.serviceAccountEmail;
      const hasKey = !!config.google.privateKey;
      const hasSheetId = !!config.google.sheetId;
      return hasEmail && hasKey && hasSheetId;
    },
    details: () => [
      `Service Account Email: ${config.google.serviceAccountEmail ? '✅' : '❌'}`,
      `Private Key: ${config.google.privateKey ? '✅' : '❌'}`,
      `Sheet ID: ${config.google.sheetId ? '✅' : '❌'}`
    ]
  },
  {
    name: 'Cloudinary Configuration',
    check: () => {
      const hasCloudName = !!config.cloudinary.cloudName;
      const hasApiKey = !!config.cloudinary.apiKey;
      const hasApiSecret = !!config.cloudinary.apiSecret;
      return hasCloudName && hasApiKey && hasApiSecret;
    },
    details: () => [
      `Cloud Name: ${config.cloudinary.cloudName ? '✅' : '❌'}`,
      `API Key: ${config.cloudinary.apiKey ? '✅' : '❌'}`,
      `API Secret: ${config.cloudinary.apiSecret ? '✅' : '❌'}`
    ]
  },
  {
    name: 'Paystack Configuration',
    check: () => {
      const hasSecretKey = !!config.paystack.secretKey;
      const hasPublicKey = !!config.paystack.publicKey;
      return hasSecretKey && hasPublicKey;
    },
    details: () => [
      `Secret Key: ${config.paystack.secretKey ? '✅' : '❌'}`,
      `Public Key: ${config.paystack.publicKey ? '✅' : '❌'}`
    ]
  },
  {
    name: 'NextAuth Configuration',
    check: () => {
      const hasSecret = !!process.env.NEXTAUTH_SECRET;
      const hasUrl = !!process.env.NEXTAUTH_URL;
      return hasSecret && hasUrl;
    },
    details: () => [
      `NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅' : '❌'}`,
      `NEXTAUTH_URL: ${process.env.NEXTAUTH_URL ? '✅' : '❌'}`
    ]
  },
  {
    name: 'Public Configuration',
    check: () => {
      const hasBaseUrl = !!process.env.NEXT_PUBLIC_BASE_URL;
      const hasAdminPassword = !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      return hasBaseUrl && hasAdminPassword;
    },
    details: () => [
      `NEXT_PUBLIC_BASE_URL: ${process.env.NEXT_PUBLIC_BASE_URL ? '✅' : '❌'}`,
      `NEXT_PUBLIC_ADMIN_PASSWORD: ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD ? '✅' : '❌'}`
    ]
  }
];

let allChecksPassed = true;

productionChecks.forEach(check => {
  const passed = check.check();
  console.log(`${passed ? '✅' : '❌'} ${check.name}`);
  
  if (!passed) {
    allChecksPassed = false;
    console.log('   Details:');
    check.details().forEach(detail => {
      console.log(`     ${detail}`);
    });
  }
});

// Final assessment
console.log('\n🎯 Production Readiness Assessment:');
console.log('===================================');

if (allChecksPassed && validation.isValid) {
  console.log('✅ PRODUCTION READY!');
  console.log('   All configurations are properly set.');
  console.log('   You can safely deploy to production.');
} else {
  console.log('❌ NOT READY FOR PRODUCTION');
  console.log('   Please fix the issues above before deploying.');
  
  if (!validation.isValid) {
    console.log('\n🔧 Missing Environment Variables:');
    validation.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
  }
}

// Recommendations
console.log('\n💡 Recommendations:');
console.log('===================');

if (config.isDevelopment) {
  console.log('• This check was run in development mode');
  console.log('• In production, NODE_ENV will be automatically set to "production"');
  console.log('• Make sure all environment variables are set in Vercel dashboard');
}

console.log('• Test all functionality after deployment');
console.log('• Monitor Vercel logs for any errors');
console.log('• Keep your environment variables secure');

console.log('\n📞 Next Steps:');
console.log('==============');
if (allChecksPassed && validation.isValid) {
  console.log('1. Deploy to Vercel: git push origin main');
  console.log('2. Monitor deployment in Vercel dashboard');
  console.log('3. Test all functionality on live site');
  console.log('4. Check Vercel logs for any issues');
} else {
  console.log('1. Fix missing environment variables');
  console.log('2. Set up production environment in Vercel dashboard');
  console.log('3. Re-run this check: npm run deploy:check');
  console.log('4. Deploy only when all checks pass');
} 