import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id
    console.log("Deleting marketplace item with ID:", itemId)

    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[1] // Marketplace sheet
    const rows = await sheet.getRows()

    // Find the row with the matching ID
    const rowIndex = rows.findIndex((row) => row.get("ID") === itemId)

    if (rowIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Delete the row
    await rows[rowIndex].delete()

    return NextResponse.json({ success: true, message: "Marketplace item deleted successfully" })
  } catch (error) {
    console.error("Error deleting marketplace item:", error)
    return NextResponse.json({ error: "Failed to delete marketplace item" }, { status: 500 })
  }
}
