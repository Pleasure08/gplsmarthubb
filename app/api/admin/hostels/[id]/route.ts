import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hostelId = params.id
    console.log("Deleting hostel with ID:", hostelId)

    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[0] // Hostels sheet
    const rows = await sheet.getRows()

    // Find the row with the matching ID
    const rowIndex = rows.findIndex((row) => row.get("ID") === hostelId)

    if (rowIndex === -1) {
      return NextResponse.json({ error: "Hostel not found" }, { status: 404 })
    }

    // Delete the row
    await rows[rowIndex].delete()

    return NextResponse.json({ success: true, message: "Hostel deleted successfully" })
  } catch (error) {
    console.error("Error deleting hostel:", error)
    return NextResponse.json({ error: "Failed to delete hostel" }, { status: 500 })
  }
}
