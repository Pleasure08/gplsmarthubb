"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowLeft, MapPin, Home, Calendar, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import type { Hostel } from "@/lib/types"
import { useParams } from "next/navigation"

interface PageParams {
  id: string
}

export default function HostelPreviewPage() {
  const params = useParams<PageParams>()
  const id = params?.id
  const [hostel, setHostel] = useState<Hostel | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      fetchHostel()
    }
  }, [id])

  const fetchHostel = async () => {
    try {
      setLoading(true)
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const response = await fetch(`${origin}/api/hostels/${id}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch hostel")
      }

      const data = await response.json()
      setHostel(data)
    } catch (error) {
      console.error("Error fetching hostel:", error)
      toast({
        title: "Error",
        description: "Failed to load hostel details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleContactOwner = () => {
    if (!hostel) return

    const message = `Hi, I'm interested in "${hostel.name}" hostel. Is it still available for rent?`
    window.open(`https://wa.me/${hostel.whatsappContact}?text=${encodeURIComponent(message)}`, "_blank")
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

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Hostel Not Found</h1>
          <p className="text-gray-600 mb-4">This hostel may have been removed or is no longer available.</p>
          <Button asChild>
            <Link href="/hostels">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hostels
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
          <Link href="/hostels">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hostels
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={hostel.imageUrl}
                alt={hostel.name}
                fill
                className="object-cover"
              />
              {hostel.status === "full" && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FULLY BOOKED</span>
                </div>
              )}
            </div>
          </div>

          {/* Hostel Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
              <p className="text-2xl font-bold text-orange-600">₦{hostel.pricePerYear.toLocaleString()}/year</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Hostel Details</h2>
                <dl className="space-y-4">
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </dt>
                    <dd className="ml-2 text-sm text-gray-900">{hostel.location}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <Home className="h-4 w-4 mr-2" />
                      Status
                    </dt>
                    <dd className="ml-2 text-sm text-gray-900 capitalize">{hostel.status}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Listed
                    </dt>
                    <dd className="ml-2 text-sm text-gray-900">
                      {new Date(hostel.dateAdded).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <Eye className="h-4 w-4 mr-2" />
                      Views
                    </dt>
                    <dd className="ml-2 text-sm text-gray-900">{hostel.views}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Description</dt>
                    <dd className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                      {hostel.description}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Button
              onClick={handleContactOwner}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={hostel.status === "full"}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {hostel.status === "full" ? "Fully Booked" : "Contact via WhatsApp"}
            </Button>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Important Information</h3>
              <ul className="list-disc list-inside text-sm text-orange-700 space-y-2">
                <li>Visit the hostel in person before making any payment</li>
                <li>Verify all facilities and amenities mentioned</li>
                <li>Get a proper receipt for any payment made</li>
                <li>Keep all communication within WhatsApp for record</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 