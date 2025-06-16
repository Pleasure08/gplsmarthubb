import { google } from 'googleapis';
import { auth } from './google-auth';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Validate environment variables
function validateGoogleConfig() {
  const requiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SHEET_ID'
  ]
  
  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

export async function getGoogleSheet(sheetId: string) {
  try {
    // Validate environment variables first
    validateGoogleConfig()

    console.log("Connecting to Google Sheets...")
    console.log("Sheet ID:", sheetId)

    // Create sheets client with auth
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Test the connection
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    console.log("Sheet info loaded successfully")
    console.log("Sheet title:", response.data.properties?.title)
    
    return sheets;
  } catch (error) {
    console.error("Error connecting to Google Sheets:")
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
      
      // Additional debugging for specific error types
      if (error.message.includes('invalid_grant')) {
        console.error("Authentication failed. Check if your service account credentials are correct.")
      } else if (error.message.includes('not found')) {
        console.error("Sheet not found. Check if the Sheet ID is correct and the service account has access.")
      } else if (error.message.includes('unregistered callers')) {
        console.error("API access not enabled. Please enable the Google Sheets API in your Google Cloud Console.")
      }
    }
    throw error
  }
}

export async function getHostels() {
  try {
    console.log("Starting getHostels function...")
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get or create the hostels sheet
    let sheet = doc.sheetsByIndex[0] // Hostels sheet
    
    // Define required headers
    const requiredHeaders = [
      "ID",
      "Name",
      "Location",
      "Price Per Year",
      "Image URLs",
      "Image Public IDs",
      "Video URL",
      "Video Public ID",
      "WhatsApp Contact",
      "Description",
      "Status",
      "Date Added",
      "Views"
    ]

    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log("Creating new Hostels sheet...")
      sheet = await doc.addSheet({ 
        title: "Hostels",
        headerValues: requiredHeaders
      })
      await sheet.loadHeaderRow()
      console.log("Created new Hostels sheet with headers")
      return [] // Return empty array since sheet is new
    }

    // Load and verify headers
    await sheet.loadHeaderRow()
    const currentHeaders = sheet.headerValues || []
    
    // Update headers if needed
    if (currentHeaders.length === 0 || !requiredHeaders.every(header => currentHeaders.includes(header))) {
      console.log("Updating Hostels sheet headers...")
      await sheet.setHeaderRow(requiredHeaders)
      await sheet.loadHeaderRow()
    }

    // Get rows
    const rows = await sheet.getRows()
    console.log(`Found ${rows.length} total rows in sheet`)

    const availableHostels = rows.filter((row) => row.get("Status") === "available")
    console.log(`Found ${availableHostels.length} available hostels`)

    return availableHostels.map((row) => {
      // Get and clean image URLs
      const rawImageUrls = row.get("Image URLs")
      console.log(`Raw Image URLs for hostel ${row.get("ID")}: ${rawImageUrls}`)
      
      const imageUrls = (rawImageUrls || "")
        .split(",")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0)

      console.log(`Processed Image URLs for hostel ${row.get("ID")}:`, imageUrls)

      // Get and clean image public IDs
      const imagePublicIds = (row.get("Image Public IDs") || "")
        .split(",")
        .map((id: string) => id.trim())
        .filter((id: string) => id.length > 0)

      // Get video URL and public ID
      const videoUrl = row.get("Video URL") || undefined
      const videoPublicId = row.get("Video Public ID") || undefined

      const hostelData = {
        id: row.get("ID"),
        name: row.get("Name"),
        location: row.get("Location"),
        pricePerYear: Number.parseInt(row.get("Price Per Year")),
        imageUrls: imageUrls,
        videoUrl: videoUrl,
        imagePublicIds: imagePublicIds,
        videoPublicId: videoPublicId,
        whatsappContact: row.get("WhatsApp Contact"),
        description: row.get("Description"),
        status: row.get("Status"),
        dateAdded: row.get("Date Added"),
        views: Number.parseInt(row.get("Views") || "0"),
      }

      console.log(`Processed hostel data for ${hostelData.id}:`, {
        name: hostelData.name,
        imageUrlsCount: hostelData.imageUrls.length,
        hasVideo: Boolean(hostelData.videoUrl)
      })

      return hostelData
    })
  } catch (error) {
    console.error("Error in getHostels:", error)
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    return []
  }
}

export async function getMarketplaceItems() {
  try {
    console.log("Starting getMarketplaceItems function...")
    const sheets = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get the marketplace sheet
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    });

    // Find the marketplace sheet
    const marketplaceSheet = response.data.sheets?.find(
      sheet => sheet.properties?.title === "Marketplace"
    );

    if (!marketplaceSheet) {
      console.log("Marketplace sheet not found, returning empty array")
      return [];
    }

    // Get the values from the sheet
    const valuesResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Marketplace!A:L",
    });

    const rows = valuesResponse.data.values || [];
    console.log(`Found ${rows.length} rows in marketplace sheet`);

    if (rows.length <= 1) {
      console.log("No data rows found in marketplace sheet");
      return [];
    }

    // Get headers from first row
    const headers = rows[0];
    console.log("Marketplace sheet headers:", headers);

    // Process data rows
    const items = rows.slice(1).map((row, index) => {
      // Create an object with header keys
      const item: any = {};
      headers.forEach((header, i) => {
        item[header] = row[i] || "";
      });

      // Process image URLs
      const imageUrls = (item["Image URLs"] || "")
        .split(",")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0);

      // Process image public IDs
      const imagePublicIds = (item["Image Public IDs"] || "")
        .split(",")
        .map((id: string) => id.trim())
        .filter((id: string) => id.length > 0);

      return {
        id: item.ID,
        title: item.Title,
        category: item.Category,
        imageUrls: imageUrls,
        imagePublicIds: imagePublicIds,
        description: item.Description,
        price: Number(item.Price) || 0,
        whatsappNumber: item["WhatsApp Number"],
        status: item.Status,
        approvalStatus: item["Approval Status"],
        datePosted: item["Date Posted"],
        sellerName: item["Seller Name"],
      };
    });

    console.log(`Processed ${items.length} marketplace items`);
    return items;
  } catch (error) {
    console.error("Error in getMarketplaceItems:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return [];
  }
}

export async function addHostel(hostelData: any) {
  try {
    console.log("Adding hostel to Google Sheets:", hostelData)
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[0] // Hostels sheet

    // Make sure the sheet exists
    if (!sheet) {
      console.error("Hostels sheet not found")
      return { success: false, error: "Hostels sheet not found" }
    }

    // Ensure status is set to 'available' for new hostels
    const dataToAdd = {
      ...hostelData,
      Status: hostelData.Status || "available",
    }

    await sheet.addRow(dataToAdd)
    console.log("Hostel added successfully to Google Sheets")
    return { success: true }
  } catch (error) {
    console.error("Error adding hostel:", error)
    return { success: false, error: String(error) }
  }
}

export async function addMarketplaceItem(itemData: any) {
  try {
    console.log("Starting addMarketplaceItem function...")
    const sheets = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get the marketplace sheet
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    });

    // Find the marketplace sheet
    const marketplaceSheet = response.data.sheets?.find(
      sheet => sheet.properties?.title === "Marketplace"
    );

    if (!marketplaceSheet) {
      // Create marketplace sheet if it doesn't exist
      console.log("Creating new Marketplace sheet...")
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: "Marketplace",
                gridProperties: {
                  rowCount: 1000,
                  columnCount: 12
                }
              }
            }
          }]
        }
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: "Marketplace!A1:L1",
        valueInputOption: "RAW",
        requestBody: {
          values: [[
            "ID",
            "Title",
            "Category",
            "Image URLs",
            "Image Public IDs",
            "Description",
            "Price",
            "WhatsApp Number",
            "Status",
            "Approval Status",
            "Date Posted",
            "Seller Name"
          ]]
        }
      });
    }

    // Prepare the row data
    const rowData = [
      itemData.ID,
      itemData.Title,
      itemData.Category,
      itemData["Image URLs"],
      itemData["Image Public IDs"],
      itemData.Description,
      itemData.Price,
      itemData["WhatsApp Number"],
      itemData.Status,
      itemData["Approval Status"],
      itemData["Date Posted"],
      itemData["Seller Name"]
    ];

    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Marketplace!A:L",
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData]
      }
    });

    console.log("Successfully added marketplace item:", {
      id: itemData.ID,
      title: itemData.Title
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding marketplace item:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add marketplace item" 
    };
  }
}

export async function updateItemStatus(itemId: string, status: string) {
  try {
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[1]
    const rows = await sheet.getRows()

    const row = rows.find((r) => r.get("ID") === itemId)
    if (row) {
      row.set("Status", status)
      await row.save()
      return { success: true }
    }
    return { success: false, error: "Item not found" }
  } catch (error) {
    console.error("Error updating item status:", error)
    return { success: false, error: "Failed to update status" }
  }
}

// Settings functions
export async function getSettings() {
  try {
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)

    // Try to get settings sheet (index 2), create if doesn't exist
    let settingsSheet = doc.sheetsByIndex[2]
    if (!settingsSheet) {
      settingsSheet = await doc.addSheet({ title: "Settings" })
      // Add headers
      await settingsSheet.setHeaderRow(["Key", "Value", "Type", "Description", "Updated"])

      // Add default settings
      const defaultSettings = [
        {
          Key: "siteName",
          Value: "GPL SmartHub",
          Type: "string",
          Description: "Site name",
          Updated: new Date().toISOString(),
        },
        {
          Key: "siteDescription",
          Value: "Student accommodation platform",
          Type: "string",
          Description: "Site description",
          Updated: new Date().toISOString(),
        },
        {
          Key: "maintenanceMode",
          Value: "false",
          Type: "boolean",
          Description: "Maintenance mode toggle",
          Updated: new Date().toISOString(),
        },
        {
          Key: "allowRegistrations",
          Value: "true",
          Type: "boolean",
          Description: "Allow new registrations",
          Updated: new Date().toISOString(),
        },
        {
          Key: "emailNotifications",
          Value: "true",
          Type: "boolean",
          Description: "Email notifications",
          Updated: new Date().toISOString(),
        },
        {
          Key: "smsNotifications",
          Value: "false",
          Type: "boolean",
          Description: "SMS notifications",
          Updated: new Date().toISOString(),
        },
        {
          Key: "autoApproveListings",
          Value: "false",
          Type: "boolean",
          Description: "Auto approve listings",
          Updated: new Date().toISOString(),
        },
        {
          Key: "maxFileSize",
          Value: "10",
          Type: "number",
          Description: "Max file size in MB",
          Updated: new Date().toISOString(),
        },
        {
          Key: "supportEmail",
          Value: "gplsmarthub@gmail.com",
          Type: "string",
          Description: "Support email",
          Updated: new Date().toISOString(),
        },
        {
          Key: "supportPhone",
          Value: "+2348153518887",
          Type: "string",
          Description: "Support phone",
          Updated: new Date().toISOString(),
        },
        {
          Key: "facebookUrl",
          Value: "",
          Type: "string",
          Description: "Facebook URL",
          Updated: new Date().toISOString(),
        },
        { Key: "twitterUrl", Value: "", Type: "string", Description: "Twitter URL", Updated: new Date().toISOString() },
        {
          Key: "instagramUrl",
          Value: "",
          Type: "string",
          Description: "Instagram URL",
          Updated: new Date().toISOString(),
        },
      ]

      await settingsSheet.addRows(defaultSettings)
    }

    const rows = await settingsSheet.getRows()
    const settings: any = {}

    rows.forEach((row) => {
      const key = row.get("Key")
      const value = row.get("Value")
      const type = row.get("Type")

      if (type === "boolean") {
        settings[key] = value === "true"
      } else if (type === "number") {
        settings[key] = value
      } else {
        settings[key] = value
      }
    })

    return { success: true, settings }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return { success: false, error: String(error) }
  }
}

export async function updateSettings(newSettings: any) {
  try {
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const settingsSheet = doc.sheetsByIndex[2]

    if (!settingsSheet) {
      throw new Error("Settings sheet not found")
    }

    const rows = await settingsSheet.getRows()

    for (const [key, value] of Object.entries(newSettings)) {
      const row = rows.find((r) => r.get("Key") === key)
      if (row) {
        row.set("Value", String(value))
        row.set("Updated", new Date().toISOString())
        await row.save()
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating settings:", error)
    return { success: false, error: String(error) }
  }
}
