#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Environment Setup Helper');
console.log('============================\n');

// Check if .env.local exists
const envLocalPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local already exists');
  console.log('   You can edit it manually or run this script to create a new one.\n');
} else {
  console.log('📝 Creating .env.local from template...');
  
  if (fs.existsSync(envExamplePath)) {
    try {
      const exampleContent = fs.readFileSync(envExamplePath, 'utf8');
      fs.writeFileSync(envLocalPath, exampleContent);
      console.log('✅ .env.local created successfully!');
      console.log('   Please edit .env.local with your actual values.\n');
    } catch (error) {
      console.error('❌ Error creating .env.local:', error.message);
    }
  } else {
    console.error('❌ env.example not found');
  }
}

console.log('📋 Next Steps:');
console.log('1. Edit .env.local with your development values');
console.log('2. Set up production environment variables in Vercel');
console.log('3. Run "node env-test.js" to verify your configuration');
console.log('4. Run "node test-sheet.js" to test Google Sheets connection');
console.log('\n📖 For detailed instructions, see SETUP.md');

console.log('\n🔧 Environment Variables Checklist:');
console.log('=====================================');
console.log('Google Sheets:');
console.log('  ☐ GOOGLE_SERVICE_ACCOUNT_EMAIL');
console.log('  ☐ GOOGLE_PRIVATE_KEY');
console.log('  ☐ GOOGLE_SHEET_ID');
console.log('\nCloudinary:');
console.log('  ☐ CLOUDINARY_CLOUD_NAME');
console.log('  ☐ CLOUDINARY_API_KEY');
console.log('  ☐ CLOUDINARY_API_SECRET');
console.log('\nPaystack:');
console.log('  ☐ PAYSTACK_SECRET_KEY');
console.log('  ☐ PAYSTACK_PUBLIC_KEY');
console.log('\nNext.js:');
console.log('  ☐ NEXTAUTH_SECRET');
console.log('  ☐ NEXTAUTH_URL'); 