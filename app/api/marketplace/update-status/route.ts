import { type NextRequest, NextResponse } from "next/server"
import { updateItemStatus } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const { itemId, status } = await request.json()

    const result = await updateItemStatus(itemId, status)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating item status:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
