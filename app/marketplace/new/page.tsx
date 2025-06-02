"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { UploadForm } from "@/components/marketplace/upload-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lock, Upload, ArrowRight } from "lucide-react"

export default function NewListingPage() {
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const reference = searchParams.get("reference")

  useEffect(() => {
    if (reference) {
      verifyPayment(reference)
    } else {
      // Check if user has a valid session
      const hasValidSession = sessionStorage.getItem("paymentVerified")
      if (hasValidSession) {
        setPaymentVerified(true)
      }
      setLoading(false)
    }
  }, [reference])

  const verifyPayment = async (ref: string) => {
    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: ref }),
      })

      const data = await response.json()

      if (data.success) {
        setPaymentVerified(true)
        // Store verification in session
        sessionStorage.setItem("paymentVerified", "true")
        sessionStorage.setItem("paymentReference", ref)
      } else {
        router.push("/marketplace/sell")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      router.push("/marketplace/sell")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Verifying payment...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!paymentVerified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Required</h1>
                <p className="text-gray-600 mb-6">You need to complete the ₦500 payment to access the listing form.</p>
                <button
                  onClick={() => router.push("/marketplace/sell")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Go to Payment
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Payment Success Card */}
          <Card className="mb-6 animate-bounce-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-4">
                  Your ₦500 payment has been confirmed. You can now list your item on the marketplace.
                </p>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Transaction Reference:</span>
                    <span className="font-mono text-gray-900">
                      {reference || sessionStorage.getItem("paymentReference")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-semibold text-green-600">₦500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Verified ✓</span>
                  </div>
                </div>

                {!showUploadForm && (
                  <button
                    onClick={() => setShowUploadForm(true)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center mx-auto"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Start Listing Your Item
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upload Form */}
          {showUploadForm && (
            <Card className="animate-slide-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-orange-500" />
                  Upload Your Item
                </CardTitle>
                <p className="text-gray-600">Fill in the details below to list your item on the marketplace.</p>
              </CardHeader>
              <CardContent>
                <UploadForm />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
