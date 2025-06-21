#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Production Deployment Helper');
console.log('================================\n');

// Check if we're in a git repository
try {
  execSync('git status', { stdio: 'pipe' });
  console.log('✅ Git repository detected');
} catch (error) {
  console.error('❌ Not in a git repository. Please initialize git first.');
  process.exit(1);
}

// Check if there are uncommitted changes
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.log('📝 Uncommitted changes detected:');
    console.log(status);
    console.log('\n💡 Please commit your changes before deploying to production.');
    console.log('   Run: git add . && git commit -m "Your commit message"');
    process.exit(1);
  } else {
    console.log('✅ No uncommitted changes');
  }
} catch (error) {
  console.error('❌ Error checking git status:', error.message);
  process.exit(1);
}

// Check if .env.local exists (for reference)
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local exists (for development reference)');
} else {
  console.log('⚠️  .env.local not found (this is okay for production)');
}

// Check if production environment variables are documented
const productionEnvPath = path.join(__dirname, '..', 'production-env-template.md');
if (fs.existsSync(productionEnvPath)) {
  console.log('✅ Production environment template found');
} else {
  console.log('⚠️  Production environment template not found');
}

console.log('\n📋 Pre-Deployment Checklist:');
console.log('============================');
console.log('☐ Environment variables set in Vercel dashboard');
console.log('☐ Google Sheets production spreadsheet ready');
console.log('☐ Cloudinary account configured');
console.log('☐ Paystack live keys obtained');
console.log('☐ Domain configured (gplsmarthub.com.ng)');
console.log('☐ Admin password set');

console.log('\n🚀 Ready to Deploy?');
console.log('===================');
console.log('1. Ensure all environment variables are set in Vercel');
console.log('2. Run: git push origin main');
console.log('3. Monitor deployment in Vercel dashboard');
console.log('4. Test all functionality on live site');

console.log('\n🔍 Post-Deployment Testing:');
console.log('==========================');
console.log('☐ Visit https://gplsmarthub.com.ng');
console.log('☐ Test marketplace item listing');
console.log('☐ Test image uploads');
console.log('☐ Test Google Sheets integration');
console.log('☐ Test payment flow');
console.log('☐ Test admin access');
console.log('☐ Check Vercel logs for errors');

console.log('\n📞 Need Help?');
console.log('=============');
console.log('- Check Vercel deployment logs');
console.log('- Review SETUP.md for troubleshooting');
console.log('- Test configuration with: npm run test:config');

// Check if user wants to proceed with deployment
console.log('\n💡 To deploy, run:');
console.log('   git push origin main'); 