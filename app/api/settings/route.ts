import { NextResponse } from "next/server"
import { getSettings, updateSettings } from "@/lib/google-sheets"

export async function GET() {
  try {
    const result = await getSettings()
    if (result.success) {
      return NextResponse.json(result.settings)
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const settings = await request.json()
    const result = await updateSettings(settings)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
