"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { UploadForm } from "@/components/marketplace/upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Upload, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadData {
  title: string
  category: string
  price: string | number
  description: string
  sellerName: string
  whatsappNumber: string
}

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadData, setUploadData] = useState<UploadData | null>(null)

  const steps = [
    {
      number: 1,
      title: "Upload Details",
      description: "Add item information",
      icon: Upload,
    },
    {
      number: 2,
      title: "Request Approval",
      description: "Contact admin",
      icon: MessageCircle,
    },
    {
      number: 3,
      title: "Complete",
      description: "Await approval",
      icon: CheckCircle,
    },
  ]

  const handleUploadSuccess = (data: UploadData) => {
    console.log("Upload data received:", data) // Debug log
    setUploadData(data)
    setCurrentStep(2)
  }

  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(numericPrice)) return '0'
    return numericPrice.toLocaleString()
  }

  const formatWhatsAppMessage = () => {
    if (!uploadData) {
      console.error("Upload data is null")
      return ""
    }
    
    console.log("Formatting message with data:", uploadData)
    
    return `Hi, I want to upload an item to the marketplace:\n\n` +
      `Item: ${uploadData.title}\n` +
      `Category: ${uploadData.category}\n` +
      `Price: ₦${formatPrice(uploadData.price)}\n` +
      `Description: ${uploadData.description}\n\n` +
      `My Name: ${uploadData.sellerName}\n` +
      `My WhatsApp: ${uploadData.whatsappNumber}\n\n` +
      `Please check for approval. Thank you!`
  }

  const handleContactAdmin = (adminNumber: string) => {
    const message = formatWhatsAppMessage()
    if (!message) {
      console.error("Failed to generate message") // Debug log
      return
    }
    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Item</h1>
          <p className="text-gray-600">List your item in the student marketplace</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-sm font-medium ${isActive || isCompleted ? "text-gray-900" : "text-gray-500"}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Item Details
                </CardTitle>
                <CardDescription>
                  Fill in your item details. After submission, you'll need to request admin approval.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadForm onSuccess={handleUploadSuccess} />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && uploadData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Request Admin Approval
                </CardTitle>
                <CardDescription>
                  Your item details have been saved. Click below to contact an admin for approval.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="mb-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-orange-800 mb-2">Item Details Preview</h3>
                    <div className="space-y-2 text-sm text-orange-700">
                      <p><strong>Item:</strong> {uploadData.title}</p>
                      <p><strong>Category:</strong> {uploadData.category}</p>
                      <p><strong>Price:</strong> ₦{formatPrice(uploadData.price)}</p>
                      <p><strong>Seller:</strong> {uploadData.sellerName}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Click one of the buttons below to contact an admin via WhatsApp for approval.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => handleContactAdmin("2348153518887")}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contact Admin 1
                    </Button>
                    <Button
                      onClick={() => handleContactAdmin("2348083169080")}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contact Admin 2
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-500">
                  <Sparkles className="h-5 w-5" />
                  Approval Request Sent
                </CardTitle>
                <CardDescription>
                  Your item is pending admin approval. You'll be notified once it's approved.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-600">
                    The admin will review your item and approve it shortly. Once approved, your item will appear in the marketplace.
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href="/marketplace"
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Marketplace
                  </a>
                  <br />
                  <a
                    href="/marketplace/sell"
                    className="inline-block text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    List Another Item
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
