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
    const approvalStatusIndex = headers.indexOf("Approval Status");
    const statusIndex = headers.indexOf("Status");

    if (idIndex === -1 || approvalStatusIndex === -1 || statusIndex === -1) {
      return NextResponse.json({ error: "Required columns not found" }, { status: 500 });
    }

    // Find the row with matching ID
    const rowIndex = rows.findIndex((row, index) => index > 0 && row[idIndex] === itemId);
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Update the row
    const newStatus = approvalStatus === "approved" ? "available" : "unavailable";
    const updatedRow = [...rows[rowIndex]];
    updatedRow[approvalStatusIndex] = approvalStatus;
    updatedRow[statusIndex] = newStatus;

    // Update the row in the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `Marketplace!A${rowIndex + 2}:L${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [updatedRow]
      }
    });

    // Get the updated item data
    const item = {
      id: updatedRow[idIndex],
      title: updatedRow[headers.indexOf("Title")],
      category: updatedRow[headers.indexOf("Category")],
      description: updatedRow[headers.indexOf("Description")],
      price: Number(updatedRow[headers.indexOf("Price")]) || 0,
      whatsappNumber: updatedRow[headers.indexOf("WhatsApp Number")],
      sellerName: updatedRow[headers.indexOf("Seller Name")],
      status: newStatus,
      approvalStatus: approvalStatus,
      datePosted: updatedRow[headers.indexOf("Date Posted")],
      imageUrls: (updatedRow[headers.indexOf("Image URLs")] || "")
        .split(",")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0),
    };

    return NextResponse.json({ 
      success: true, 
      message: `Item ${approvalStatus} successfully`,
      item 
    });
  } catch (error) {
    console.error("Error updating marketplace item approval status:", error);
    return NextResponse.json({ 
      error: "Failed to update approval status",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 