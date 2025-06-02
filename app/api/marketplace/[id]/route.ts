import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id

    console.log("Fetching marketplace item:", itemId)

    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[1] // Marketplace sheet
    const rows = await sheet.getRows()

    // Find the row with the matching ID
    const row = rows.find((row) => row.get("ID") === itemId)

    if (!row) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Convert image URLs string to array
    const imageUrls = row.get("Image URLs") ? row.get("Image URLs").split(",") : []

    const item = {
      id: row.get("ID"),
      title: row.get("Title"),
      description: row.get("Description"),
      price: parseFloat(row.get("Price")),
      category: row.get("Category"),
      sellerName: row.get("Seller Name"),
      whatsappNumber: row.get("WhatsApp Number"),
      imageUrl: imageUrls[0] || null, // First image as main image
      images: imageUrls, // All images
      status: row.get("Status"),
      approvalStatus: row.get("Approval Status"),
      datePosted: row.get("Date Posted"),
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching marketplace item:", error)
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
  }
} 