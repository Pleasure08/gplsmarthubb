import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function DELETE(request: NextRequest) {
  try {
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get the hostels sheet (index 0)
    const sheet = doc.sheetsByIndex[0]
    
    if (!sheet) {
      return NextResponse.json({ message: "Hostels sheet not found" })
    }

    // Delete all rows except header
    const rows = await sheet.getRows()
    console.log(`Found ${rows.length} hostels to delete`)
    
    for (const row of rows) {
      await row.delete()
      console.log(`Deleted hostel with ID: ${row.get("ID")}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully cleared ${rows.length} hostels` 
    })
  } catch (error) {
    console.error("Error clearing hostels:", error)
    return NextResponse.json({ 
      error: "Failed to clear hostels" 
    }, { status: 500 })
  }
} 