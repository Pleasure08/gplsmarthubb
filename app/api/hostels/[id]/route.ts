import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hostelId = params.id

    console.log("Fetching hostel:", hostelId)

    const sheets = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)

    // Get all values from the Hostels sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Hostels!A:M",
    });

    const rows = response.data.values || [];
    if (rows.length <= 1) {
      return NextResponse.json({ error: "No data found in sheet" }, { status: 404 });
    }

    // Get headers from first row
    const headers = rows[0];
    const idIndex = headers.indexOf("ID");

    // Find the row with matching ID
    const rowIndex = rows.findIndex((row, index) => index > 0 && row[idIndex] === hostelId);
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Hostel not found" }, { status: 404 });
    }

    const row = rows[rowIndex];

    // Increment views
    const currentViews = parseInt(row[headers.indexOf("Views")] || "0");
    const updatedRow = [...row];
    updatedRow[headers.indexOf("Views")] = (currentViews + 1).toString();

    // Update the views count
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `Hostels!A${rowIndex + 2}:M${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [updatedRow]
      }
    });

    // Get and clean image URLs
    const imageUrls = (row[headers.indexOf("Image URLs")] || "")
      .split(",")
      .map((url: string) => url.trim())
      .filter((url: string) => url.length > 0);

    // Get and clean image public IDs
    const imagePublicIds = (row[headers.indexOf("Image Public IDs")] || "")
      .split(",")
      .map((id: string) => id.trim())
      .filter((id: string) => id.length > 0);

    // Get video URL and public ID
    const videoUrl = row[headers.indexOf("Video URL")] || undefined;
    const videoPublicId = row[headers.indexOf("Video Public ID")] || undefined;

    const hostel = {
      id: row[idIndex],
      name: row[headers.indexOf("Name")],
      location: row[headers.indexOf("Location")],
      pricePerYear: parseFloat(row[headers.indexOf("Price Per Year")]),
      imageUrls: imageUrls,
      videoUrl: videoUrl,
      imagePublicIds: imagePublicIds,
      videoPublicId: videoPublicId,
      whatsappContact: row[headers.indexOf("WhatsApp Contact")],
      description: row[headers.indexOf("Description")],
      status: row[headers.indexOf("Status")] || "available",
      dateAdded: row[headers.indexOf("Date Added")],
      views: currentViews + 1,
    }

    return NextResponse.json(hostel)
  } catch (error) {
    console.error("Error fetching hostel:", error)
    return NextResponse.json({ error: "Failed to fetch hostel" }, { status: 500 })
  }
} 