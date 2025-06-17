import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function DELETE(request: NextRequest) {
  try {
    const sheets = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    
    // Get all values from the Marketplace sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Marketplace!A:L",
    });

    const rows = response.data.values || [];
    if (rows.length <= 1) {
      return NextResponse.json({ message: "No marketplace items found" });
    }

    // Clear all rows except header
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Marketplace!A2:L",
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully cleared ${rows.length - 1} marketplace items` 
    });
  } catch (error) {
    console.error("Error clearing marketplace items:", error);
    return NextResponse.json({ 
      error: "Failed to clear marketplace items",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 