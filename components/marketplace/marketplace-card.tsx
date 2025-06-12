"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Calendar, User, CheckCircle, MessageCircle, MapPin } from "lucide-react"
import type { MarketplaceItem } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface MarketplaceCardProps {
  item: MarketplaceItem
  onStatusUpdate: () => void
}

export function MarketplaceCard({ item, onStatusUpdate }: MarketplaceCardProps) {
  const { toast } = useToast()

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in "${item.title}" that you posted on GPL SmartHub. Is it still available?`
    const whatsappUrl = `https://wa.me/${item.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleMarkAsSold = async () => {
    try {
      const response = await fetch("/api/marketplace/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item.id,
          status: "sold",
        }),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Item marked as sold successfully.",
        })
        onStatusUpdate()
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark item as sold. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="group overflow-hidden hover-lift">
      <Link href={`/marketplace/item/${item.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {item.status === "sold" && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SOLD</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/marketplace/item/${item.id}`} className="block">
          <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-base sm:text-lg font-bold text-orange-600 mb-2">₦{formatPrice(item.price)}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate max-w-[150px] sm:max-w-[200px]">{item.category}</span>
          </div>
          {item.status === "available" && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
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
