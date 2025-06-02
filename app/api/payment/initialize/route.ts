import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, amount } = await request.json()

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/marketplace/new`,
      }),
    })

    const data = await response.json()

    if (data.status) {
      return NextResponse.json({
        success: true,
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      })
    } else {
      return NextResponse.json({ error: "Payment initialization failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error initializing payment:", error)
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}
