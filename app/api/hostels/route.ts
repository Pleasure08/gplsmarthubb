import { NextResponse } from "next/server"
import { getHostels } from "@/lib/google-sheets"

export async function GET() {
  try {
    console.log("Fetching hostels from Google Sheets...")
    const hostels = await getHostels()
    
    // Debug logging for hostel data
    console.log("Hostels API Response Debug:", {
      totalHostels: hostels.length,
      hostelsSample: hostels.slice(0, 2).map(h => ({
        id: h.id,
        name: h.name,
        hasImageUrl: Boolean(h.imageUrl),
        imageUrl: h.imageUrl
      }))
    })
    
    // Always return an array
    console.log(`Successfully fetched ${hostels.length} hostels`)
    return NextResponse.json(hostels)
  } catch (error) {
    console.error("Error fetching hostels:", error)
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    // Return empty array on error
    return NextResponse.json([])
  }
}
