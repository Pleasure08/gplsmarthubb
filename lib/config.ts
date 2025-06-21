/**
 * Environment Configuration Utility
 * Handles environment-specific variables for development and production
 */

interface GoogleConfig {
  serviceAccountEmail: string;
  privateKey: string;
  sheetId: string;
}

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface PaystackConfig {
  secretKey: string;
  publicKey: string;
}

interface AppConfig {
  google: GoogleConfig;
  cloudinary: CloudinaryConfig;
  paystack: PaystackConfig;
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * Get environment-specific configuration
 */
export function getConfig(): AppConfig {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Google Sheets Configuration
  const googleConfig: GoogleConfig = {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    privateKey: process.env.GOOGLE_PRIVATE_KEY || '',
    sheetId: process.env.GOOGLE_SHEET_ID || '',
  };

  // Cloudinary Configuration
  const cloudinaryConfig: CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  };

  // Paystack Configuration
  const paystackConfig: PaystackConfig = {
    secretKey: process.env.PAYSTACK_SECRET_KEY || '',
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
  };

  return {
    google: googleConfig,
    cloudinary: cloudinaryConfig,
    paystack: paystackConfig,
    isProduction,
    isDevelopment,
  };
}

/**
 * Validate required environment variables
 */
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const config = getConfig();
  const errors: string[] = [];

  // Validate Google configuration
  if (!config.google.serviceAccountEmail) {
    errors.push('GOOGLE_SERVICE_ACCOUNT_EMAIL is required');
  }
  if (!config.google.privateKey) {
    errors.push('GOOGLE_PRIVATE_KEY is required');
  }
  if (!config.google.sheetId) {
    errors.push('GOOGLE_SHEET_ID is required');
  }

  // Validate Cloudinary configuration
  if (!config.cloudinary.cloudName) {
    errors.push('CLOUDINARY_CLOUD_NAME is required');
  }
  if (!config.cloudinary.apiKey) {
    errors.push('CLOUDINARY_API_KEY is required');
  }
  if (!config.cloudinary.apiSecret) {
    errors.push('CLOUDINARY_API_SECRET is required');
  }

  // Validate Paystack configuration
  if (!config.paystack.secretKey) {
    errors.push('PAYSTACK_SECRET_KEY is required');
  }
  if (!config.paystack.publicKey) {
    errors.push('PAYSTACK_PUBLIC_KEY is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get formatted private key (handles newline escaping)
 */
export function getFormattedPrivateKey(): string {
  const config = getConfig();
  const privateKey = config.google.privateKey;
  
  if (!privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY is not set');
  }

  // Handle both escaped and unescaped newlines
  return privateKey.replace(/\\n/g, '\n');
}

/**
 * Log configuration status (for debugging)
 */
export function logConfigStatus(): void {
  const config = getConfig();
  const validation = validateConfig();

  console.log('🔧 Environment Configuration Status:');
  console.log(`   Environment: ${config.isProduction ? 'Production' : 'Development'}`);
  console.log(`   Configuration Valid: ${validation.isValid ? '✅' : '❌'}`);
  
  if (!validation.isValid) {
    console.log('   Missing Variables:');
    validation.errors.forEach(error => console.log(`     - ${error}`));
  }

  // Log Google config status (without sensitive data)
  console.log('   Google Sheets:');
  console.log(`     Service Account Email: ${config.google.serviceAccountEmail ? '✅ Set' : '❌ Missing'}`);
  console.log(`     Private Key: ${config.google.privateKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`     Sheet ID: ${config.google.sheetId ? '✅ Set' : '❌ Missing'}`);

  // Log other config status
  console.log('   Cloudinary:');
  console.log(`     Cloud Name: ${config.cloudinary.cloudName ? '✅ Set' : '❌ Missing'}`);
  console.log(`     API Key: ${config.cloudinary.apiKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`     API Secret: ${config.cloudinary.apiSecret ? '✅ Set' : '❌ Missing'}`);

  console.log('   Paystack:');
  console.log(`     Secret Key: ${config.paystack.secretKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`     Public Key: ${config.paystack.publicKey ? '✅ Set' : '❌ Missing'}`);
} 