import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hostelId = params.id

    console.log("Fetching hostel:", hostelId)

    const doc = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)
    const sheet = doc.sheetsByIndex[0] // Hostels sheet
    const rows = await sheet.getRows()

    // Find the row with the matching ID
    const row = rows.find((row) => row.get("ID") === hostelId)

    if (!row) {
      return NextResponse.json({ error: "Hostel not found" }, { status: 404 })
    }

    // Increment views
    const currentViews = parseInt(row.get("Views") || "0")
    row.set("Views", (currentViews + 1).toString())
    await row.save()

    // Get and clean image URLs
    const imageUrls = (row.get("Image URLs") || "")
      .split(",")
      .map((url: string) => url.trim())
      .filter((url: string) => url.length > 0)

    // Get and clean image public IDs
    const imagePublicIds = (row.get("Image Public IDs") || "")
      .split(",")
      .map((id: string) => id.trim())
      .filter((id: string) => id.length > 0)

    // Get video URL and public ID
    const videoUrl = row.get("Video URL") || undefined
    const videoPublicId = row.get("Video Public ID") || undefined

    const hostel = {
      id: row.get("ID"),
      name: row.get("Name"),
      location: row.get("Location"),
      pricePerYear: parseFloat(row.get("Price Per Year")),
      imageUrls: imageUrls,
      videoUrl: videoUrl,
      imagePublicIds: imagePublicIds,
      videoPublicId: videoPublicId,
      whatsappContact: row.get("WhatsApp Contact"),
      description: row.get("Description"),
      status: row.get("Status"),
      dateAdded: row.get("Date Added"),
      views: currentViews + 1,
    }

    return NextResponse.json(hostel)
  } catch (error) {
    console.error("Error fetching hostel:", error)
    return NextResponse.json({ error: "Failed to fetch hostel" }, { status: 500 })
  }
} 