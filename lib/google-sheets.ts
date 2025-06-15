import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"]

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
    console.log("Service Account Email:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)

    // Check if private key exists and format it properly
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
    if (!privateKey) {
      throw new Error("GOOGLE_PRIVATE_KEY environment variable is not set")
    }

    console.log("Private key length:", privateKey.length)
    console.log("Private key starts with:", privateKey.substring(0, 50))

    // Format the private key properly - handle both production and development environments
    const formattedPrivateKey = privateKey
      .replace(/\\n/g, "\n")  // Handle Vercel's environment
      .replace(/\\\\n/g, "\n") // Handle double-escaped newlines
      .replace(/"/g, "")      // Remove any quotes
      .trim()                 // Remove any extra whitespace

    // Create JWT client with explicit type
    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: formattedPrivateKey,
      scopes: SCOPES,
    })

    console.log("JWT client created successfully")

    // Create and load the sheet
    const doc = new GoogleSpreadsheet(sheetId, jwt)
    console.log("GoogleSpreadsheet instance created")

    await doc.loadInfo()
    console.log("Sheet info loaded successfully")
    console.log("Sheet title:", doc.title)
    console.log("Number of sheets:", doc.sheetCount)

    return doc
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
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get or create the marketplace sheet
    let sheet = doc.sheetsByIndex[1] // Marketplace sheet
    
    // Define required headers
    const requiredHeaders = [
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
    ]

    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log("Creating new Marketplace sheet...")
      sheet = await doc.addSheet({ 
        title: "Marketplace",
        headerValues: requiredHeaders
      })
      await sheet.loadHeaderRow()
      console.log("Created new Marketplace sheet with headers")
      return [] // Return empty array since sheet is new
    }

    // Load and verify headers
    await sheet.loadHeaderRow()
    const currentHeaders = sheet.headerValues || []
    
    // Update headers if needed
    if (currentHeaders.length === 0 || !requiredHeaders.every(header => currentHeaders.includes(header))) {
      console.log("Updating Marketplace sheet headers...")
      await sheet.setHeaderRow(requiredHeaders)
      await sheet.loadHeaderRow()
    }

    // Get rows
    const rows = await sheet.getRows()

    return rows.map((row) => {
      const imageUrls = (row.get("Image URLs") || "")
        .split(",")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0)

      const imagePublicIds = (row.get("Image Public IDs") || "")
        .split(",")
        .map((id: string) => id.trim())
        .filter((id: string) => id.length > 0)

      return {
        id: row.get("ID"),
        title: row.get("Title"),
        category: row.get("Category"),
        imageUrl: imageUrls[0] || "", // Use first image as main
        imageUrls: imageUrls, // All images
        imagePublicId: imagePublicIds[0] || "",
        imagePublicIds: imagePublicIds,
        description: row.get("Description"),
        price: Number.parseInt(row.get("Price")),
        whatsappNumber: row.get("WhatsApp Number"),
        status: row.get("Status"),
        approvalStatus: row.get("Approval Status") || "pending", // Default to pending if not set
        datePosted: row.get("Date Posted"),
        sellerName: row.get("Seller Name"),
      }
    })
  } catch (error) {
    console.error("Error fetching marketplace items:", error)
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
    console.log("Adding marketplace item to Google Sheets:", itemData)
    
    // Validate sheet ID
    const sheetId = process.env.GOOGLE_SHEET_ID
    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID is not set")
    }
    
    const doc = await getGoogleSheet(sheetId)
    console.log("Successfully connected to Google Sheet")
    
    // Get or create the marketplace sheet (index 1)
    let sheet = doc.sheetsByIndex[1]
    
    // Define the required headers
    const requiredHeaders = [
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
    ]

    if (!sheet) {
      console.log("Marketplace sheet not found, creating new sheet...")
      sheet = await doc.addSheet({ 
        title: "Marketplace",
        headerValues: requiredHeaders
      })
      await sheet.loadHeaderRow()
      console.log("Created new Marketplace sheet with headers")
    }

    // Make sure the sheet is loaded
    await sheet.loadHeaderRow()
    
    // Check if headers exist and match required headers
    const currentHeaders = sheet.headerValues || []
    
    if (currentHeaders.length === 0) {
      console.log("Adding headers to existing Marketplace sheet...")
      await sheet.setHeaderRow(requiredHeaders)
      await sheet.loadHeaderRow()
      console.log("Added headers to existing sheet")
    } else {
      // Verify all required headers are present
      const missingHeaders = requiredHeaders.filter(header => !currentHeaders.includes(header))
      if (missingHeaders.length > 0) {
        console.log("Updating headers to include missing fields...")
        await sheet.setHeaderRow(requiredHeaders)
        await sheet.loadHeaderRow()
        console.log("Updated sheet headers")
      }
    }
    
    console.log("Found marketplace sheet:", sheet.title)
    console.log("Current headers:", sheet.headerValues)
    
    // Add the row with approval status
    const itemDataWithApproval = {
      ...itemData,
      "Approval Status": "pending" // Set default approval status for new items
    }
    
    console.log("Adding new row with data:", itemDataWithApproval)
    const addedRow = await sheet.addRow(itemDataWithApproval)
    console.log("Row added successfully. Row number:", addedRow.rowNumber)
    
    return { success: true }
  } catch (error) {
    console.error("Error adding marketplace item:")
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to add item to Google Sheets"
    }
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
