import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function DELETE(request: NextRequest) {
  try {
    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get the marketplace sheet (index 1)
    const sheet = doc.sheetsByIndex[1]
    
    if (!sheet) {
      return NextResponse.json({ message: "Marketplace sheet not found" })
    }

    // Delete all rows except header
    const rows = await sheet.getRows()
    for (const row of rows) {
      await row.delete()
    }

    return NextResponse.json({ 
      success: true, 
      message: "All marketplace items cleared successfully" 
    })
  } catch (error) {
    console.error("Error clearing marketplace items:", error)
    return NextResponse.json({ 
      error: "Failed to clear marketplace items" 
    }, { status: 500 })
  }
} 