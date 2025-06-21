import { getConfig, validateConfig, logConfigStatus } from './lib/config.js';

console.log('🧪 Environment Configuration Test');
console.log('=====================================');

// Test configuration
const config = getConfig();
const validation = validateConfig();

// Log detailed status
logConfigStatus();

// Test specific configurations
console.log('\n📋 Detailed Configuration Test:');
console.log('=====================================');

// Test Google configuration
console.log('Google Sheets Configuration:');
console.log(`  Service Account Email: ${config.google.serviceAccountEmail ? '✅ Set' : '❌ Missing'}`);
console.log(`  Private Key: ${config.google.privateKey ? '✅ Set' : '❌ Missing'}`);
if (config.google.privateKey) {
  console.log(`  Private Key Length: ${config.google.privateKey.length} characters`);
  console.log(`  Private Key Starts With: ${config.google.privateKey.slice(0, 30)}...`);
  console.log(`  Private Key Ends With: ...${config.google.privateKey.slice(-30)}`);
}
console.log(`  Sheet ID: ${config.google.sheetId ? '✅ Set' : '❌ Missing'}`);

// Test Cloudinary configuration
console.log('\nCloudinary Configuration:');
console.log(`  Cloud Name: ${config.cloudinary.cloudName ? '✅ Set' : '❌ Missing'}`);
console.log(`  API Key: ${config.cloudinary.apiKey ? '✅ Set' : '❌ Missing'}`);
console.log(`  API Secret: ${config.cloudinary.apiSecret ? '✅ Set' : '❌ Missing'}`);

// Test Paystack configuration
console.log('\nPaystack Configuration:');
console.log(`  Secret Key: ${config.paystack.secretKey ? '✅ Set' : '❌ Missing'}`);
console.log(`  Public Key: ${config.paystack.publicKey ? '✅ Set' : '❌ Missing'}`);

// Environment detection
console.log('\n🌍 Environment Detection:');
console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'Not set'}`);
console.log(`  Is Production: ${config.isProduction ? 'Yes' : 'No'}`);
console.log(`  Is Development: ${config.isDevelopment ? 'Yes' : 'No'}`);

// Validation results
console.log('\n✅ Validation Results:');
console.log(`  Configuration Valid: ${validation.isValid ? 'Yes' : 'No'}`);
if (!validation.isValid) {
  console.log('  Missing Variables:');
  validation.errors.forEach(error => console.log(`    - ${error}`));
}

console.log('\n🎯 Test Complete!'); 