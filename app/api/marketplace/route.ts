import { NextResponse } from "next/server"
import { getMarketplaceItems } from "@/lib/google-sheets"

export async function GET() {
  try {
    console.log("GET /api/marketplace: Fetching marketplace items...")
    const items = await getMarketplaceItems()
    console.log("GET /api/marketplace: Found items:", items.length)
    console.log("GET /api/marketplace: Items with pending status:", 
      items.filter(item => item.approvalStatus === "pending").length)
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching marketplace items:", error)
    return NextResponse.json({ error: "Failed to fetch marketplace items" }, { status: 500 })
  }
}
