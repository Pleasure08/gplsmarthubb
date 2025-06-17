import { type NextRequest, NextResponse } from "next/server"
import { getGoogleSheet } from "@/lib/google-sheets"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id
    console.log("Deleting marketplace item:", itemId)

    const sheets = await getGoogleSheet(process.env.GOOGLE_SHEET_ID!)

    // Get all values from the Marketplace sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Marketplace!A:L",
    });

    const rows = response.data.values || [];
    if (rows.length <= 1) {
      return NextResponse.json({ error: "No data found in sheet" }, { status: 404 });
    }

    // Get headers from first row
    const headers = rows[0];
    const idIndex = headers.indexOf("ID");
    const imagePublicIdsIndex = headers.indexOf("Image Public IDs");

    // Find the row with matching ID
    const rowIndex = rows.findIndex((row, index) => index > 0 && row[idIndex] === itemId);
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const row = rows[rowIndex];

    // Delete images from Cloudinary
    const imagePublicIds = (row[imagePublicIdsIndex] || "")
      .split(",")
      .map((id: string) => id.trim())
      .filter((id: string) => id.length > 0);

    // Delete images
    if (imagePublicIds.length > 0) {
      await Promise.all(
        imagePublicIds.map((publicId: string) =>
          cloudinary.uploader.destroy(publicId)
        )
      );
    }

    // Delete the row from the sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 1, // Assuming Marketplace is the second sheet
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1
              }
            }
          }
        ]
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Marketplace item deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting marketplace item:", error);
    return NextResponse.json({ 
      error: "Failed to delete marketplace item",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
