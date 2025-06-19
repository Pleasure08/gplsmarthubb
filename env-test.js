require('dotenv').config();
console.log('GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'Loaded' : 'NOT FOUND');
console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'Loaded' : 'NOT FOUND');
console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? 'Loaded' : 'NOT FOUND'); 