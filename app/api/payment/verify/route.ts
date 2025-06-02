import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    const response = await fetch("https://api.paystack.co/transaction/verify/" + reference, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (data.status && data.data.status === "success") {
      // Verify the amount is correct (₦500 = 50000 kobo)
      if (data.data.amount !== 50000) {
        console.error("Invalid payment amount:", {
          expected: 50000,
          received: data.data.amount,
          reference
        })
        return NextResponse.json({ 
          error: "Invalid payment amount",
          details: "The payment amount does not match the required listing fee."
        }, { status: 400 })
      }

      console.log("Payment verified successfully:", {
        reference,
        amount: data.data.amount,
        email: data.data.customer.email,
        date: data.data.paid_at
      })

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          reference: data.data.reference,
          amount: data.data.amount,
          email: data.data.customer.email,
          date: data.data.paid_at
        }
      })
    } else {
      console.error("Payment verification failed:", {
        reference,
        status: data.data?.status,
        message: data.message
      })
      return NextResponse.json({ 
        error: "Payment verification failed",
        details: data.message || "Transaction was not successful"
      }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ 
      error: "Failed to verify payment",
      details: error instanceof Error ? error.message : "An unexpected error occurred"
    }, { status: 500 })
  }
}
