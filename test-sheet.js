import { google } from 'googleapis';
import { getConfig, getFormattedPrivateKey, logConfigStatus } from './lib/config.js';

async function testGoogleSheetsConnection() {
  console.log('🧪 Testing Google Sheets Connection');
  console.log('=====================================');

  try {
    // Log configuration status
    logConfigStatus();

    const config = getConfig();
    
    // Validate configuration
    if (!config.google.serviceAccountEmail || !config.google.privateKey || !config.google.sheetId) {
      throw new Error('Missing required Google Sheets configuration');
    }

    console.log('\n🔧 Setting up Google Auth...');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.google.serviceAccountEmail,
        private_key: getFormattedPrivateKey(),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('✅ Google Auth configured successfully');

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('\n📊 Testing spreadsheet access...');
    console.log(`Sheet ID: ${config.google.sheetId}`);

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.google.sheetId,
      range: 'Sheet1!A1:A5',
    });

    console.log('✅ Fetch successful!');
    console.log('📋 Sample data:', res.data.values);
    
    // Test getting spreadsheet metadata
    console.log('\n📋 Getting spreadsheet metadata...');
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId: config.google.sheetId,
    });
    
    console.log('✅ Spreadsheet metadata retrieved');
    console.log(`📄 Title: ${metadata.data.properties.title}`);
    console.log(`📊 Sheets: ${metadata.data.sheets?.length || 0} sheets found`);
    
    if (metadata.data.sheets) {
      metadata.data.sheets.forEach((sheet, index) => {
        console.log(`  ${index + 1}. ${sheet.properties.title}`);
      });
    }

  } catch (err) {
    console.error('🚨 Error in Google Sheets test:', err);
    
    if (err.code === 403) {
      console.error('\n💡 403 Error Suggestions:');
      console.error('  1. Check if the service account has access to the spreadsheet');
      console.error('  2. Verify the spreadsheet ID is correct');
      console.error('  3. Ensure the private key is properly formatted');
      console.error('  4. Check if the spreadsheet is shared with the service account email');
    } else if (err.code === 404) {
      console.error('\n💡 404 Error Suggestions:');
      console.error('  1. Verify the spreadsheet ID is correct');
      console.error('  2. Check if the spreadsheet exists');
      console.error('  3. Ensure the service account has access');
    }
  }
}

// Run the test
testGoogleSheetsConnection(); 