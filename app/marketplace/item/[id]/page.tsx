"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import type { MarketplaceItem } from "@/lib/types"
import { useParams } from "next/navigation"

interface PageParams {
  id: string
}

export default function ItemPreviewPage() {
  const params = useParams<PageParams>()
  const id = params?.id
  const [item, setItem] = useState<MarketplaceItem | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      fetchItem()
    }
  }, [id])

  const fetchItem = async () => {
    try {
      setLoading(true)
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${origin}/api/marketplace/${id}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch item")
      }

      const data = await response.json()
      setItem(data)
    } catch (error) {
      console.error("Error fetching item:", error)
      toast({
        title: "Error",
        description: "Failed to load item details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleContactSeller = () => {
    if (!item) return

    const message = `Hi, I'm interested in your item "${item.title}" listed on the marketplace for ₦${item.price}. Is it still available?`
    window.open(`https://wa.me/${item.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-4" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-4">This item may have been removed or is no longer available.</p>
          <Button asChild>
            <Link href="/marketplace">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          asChild
          className="mb-8 hover:bg-gray-100"
        >
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              {item.images && item.images[currentImageIndex] && (
                <Image
                  src={item.images[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {/* Thumbnail Gallery */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <p className="text-2xl font-bold text-orange-600">₦{item.price.toLocaleString()}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Item Details</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">{item.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Condition</dt>
                    <dd className="mt-1 text-sm text-gray-900">Used - Good</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Seller</dt>
                    <dd className="mt-1 text-sm text-gray-900">{item.sellerName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{item.description}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Button
              onClick={handleContactSeller}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Seller via WhatsApp
            </Button>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Safety Tips</h3>
              <ul className="list-disc list-inside text-sm text-orange-700 space-y-2">
                <li>Meet in a public place</li>
                <li>Verify the item before making payment</li>
                <li>Don't share personal financial information</li>
                <li>Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 