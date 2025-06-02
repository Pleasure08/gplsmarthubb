import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id
    const { approvalStatus } = await request.json()

    if (!["approved", "rejected"].includes(approvalStatus)) {
      return NextResponse.json({ error: "Invalid approval status" }, { status: 400 })
    }

    console.log("Updating marketplace item approval status:", { itemId, approvalStatus })

    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[1] // Marketplace sheet
    const rows = await sheet.getRows()

    // Find the row with the matching ID
    const row = rows.find((row) => row.get("ID") === itemId)

    if (!row) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update both approval status and item status
    row.set("Approval Status", approvalStatus)
    
    // If approved, set status to available, if rejected set to unavailable
    row.set("Status", approvalStatus === "approved" ? "available" : "unavailable")
    
    await row.save()

    return NextResponse.json({ 
      success: true, 
      message: "Marketplace item approval status updated successfully",
      item: {
        id: row.get("ID"),
        title: row.get("Title"),
        approvalStatus: row.get("Approval Status"),
        status: row.get("Status")
      }
    })
  } catch (error) {
    console.error("Error updating marketplace item approval status:", error)
    return NextResponse.json({ error: "Failed to update approval status" }, { status: 500 })
  }
} 