"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CreditCard } from "lucide-react"

interface PaymentFormProps {
  onPaymentSuccess: () => void
}

export function PaymentForm({ onPaymentSuccess }: PaymentFormProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: 500, // ₦500 in Naira
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store email in session for later use
        sessionStorage.setItem("userEmail", email)
        // Redirect to Paystack
        window.location.href = data.authorization_url
      } else {
        throw new Error(data.error || "Payment initialization failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">Listing Fee Information</h3>
        <p className="text-orange-700 text-sm">
          A one-time fee of ₦500 is required to list your item on the marketplace. This helps ensure quality listings and serious sellers.
        </p>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Your payment receipt will be sent to this email address.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Listing Fee:</span>
          <span className="font-semibold">₦500</span>
        </div>
        <div className="text-xs text-gray-500">
          Secure payment powered by Paystack
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        <CreditCard className="h-4 w-4 mr-2" />
        {loading ? "Processing..." : "Pay ₦500 & Continue"}
      </Button>
    </form>
  )
}
