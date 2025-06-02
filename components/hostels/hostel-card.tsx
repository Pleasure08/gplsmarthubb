"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MapPin, Eye } from "lucide-react"
import type { Hostel } from "@/lib/types"
import Link from "next/link"

interface HostelCardProps {
  hostel: Hostel
}

export function HostelCard({ hostel }: HostelCardProps) {
  // Debug logging for image URLs
  console.log("Hostel Card Debug:", {
    hostelId: hostel.id,
    hostelName: hostel.name,
    imageUrl: hostel.imageUrl,
    hasImage: Boolean(hostel.imageUrl)
  })

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in "${hostel.name}" hostel. Is it still available for rent?`
    const whatsappUrl = `https://wa.me/${hostel.whatsappContact}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden hover-lift">
      <Link href={`/hostels/${hostel.id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={hostel.imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={hostel.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            priority={true}
          />
          {hostel.status === "full" && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">FULLY BOOKED</span>
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-white/90 text-gray-900"
          >
            <Eye className="h-3 w-3 mr-1" />
            {hostel.views}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/hostels/${hostel.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-600 transition-colors">
            {hostel.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-orange-600 mb-2">₦{formatPrice(hostel.pricePerYear)}/year</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm truncate max-w-[200px]">{hostel.location}</span>
          </div>
          {hostel.status === "available" && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
