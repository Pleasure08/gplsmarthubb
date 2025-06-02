"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Building, ShoppingBag, Eye, AlertTriangle, CheckCircle, X } from "lucide-react"
import Image from "next/image"

interface Hostel {
  id: string
  name: string
  location: string
  pricePerYear: number
  imageUrl: string
  status: string
  views: number
}

interface MarketplaceItem {
  id: string
  title: string
  category: string
  price: number
  imageUrl: string
  status: string
  sellerName: string
  approvalStatus: string
}

export function AdminManagement() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
    // Set up periodic refresh every 30 seconds
    const refreshInterval = setInterval(fetchData, 30000)
    return () => clearInterval(refreshInterval)
  }, [])

  const fetchData = async () => {
    try {
      console.log("Fetching admin dashboard data...")
      setLoading(true)
      
      // Fetch hostels
      const hostelResponse = await fetch("/api/hostels")
      const hostelData = await hostelResponse.json()
      setHostels(hostelData)

      // Fetch marketplace items
      const marketplaceResponse = await fetch("/api/marketplace")
      const marketplaceData = await marketplaceResponse.json()
      console.log("Fetched marketplace items:", marketplaceData)
      setMarketplaceItems(marketplaceData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteHostel = async (hostelId: string) => {
    if (!confirm("Are you sure you want to delete this hostel? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/hostels/${hostelId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setHostels(hostels.filter((h) => h.id !== hostelId))
        toast({
          title: "Success",
          description: "Hostel deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete hostel")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hostel. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteMarketplaceItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/marketplace/${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMarketplaceItems(marketplaceItems.filter((item) => item.id !== itemId))
        toast({
          title: "Success",
          description: "Marketplace item deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateItemApprovalStatus = async (itemId: string, approvalStatus: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/marketplace/${itemId}/approval`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvalStatus }),
      })

      if (response.ok) {
        setMarketplaceItems(marketplaceItems.map(item => 
          item.id === itemId ? { ...item, approvalStatus } : item
        ))
        toast({
          title: "Success",
          description: `Item ${approvalStatus} successfully.`,
        })
      } else {
        throw new Error("Failed to update approval status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update approval status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hostels Management */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-orange-500" />
            Manage Hostels ({hostels.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hostels.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hostels found.</p>
          ) : (
            <div className="space-y-4">
              {hostels.map((hostel, index) => (
                <div
                  key={hostel.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-slide-in-left"
                  style={{ "--stagger": index + 1 } as any}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={hostel.imageUrl || "/placeholder.svg?height=64&width=64"}
                        alt={hostel.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{hostel.name}</h3>
                      <p className="text-sm text-gray-600">{hostel.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={hostel.status === "available" ? "default" : "secondary"}>{hostel.status}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {hostel.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">₦{hostel.pricePerYear?.toLocaleString()}/year</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteHostel(hostel.id)}
                      className="hover-scale"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Marketplace Management */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-orange-500" />
            Manage Marketplace Items ({marketplaceItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {marketplaceItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No marketplace items found.</p>
          ) : (
            <div className="space-y-4">
              {marketplaceItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-slide-in-right"
                  style={{ "--stagger": index + 1 } as any}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl || "/placeholder.svg?height=64&width=64"}
                        alt={`${item.title} - ${item.category}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.category} • {item.sellerName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={item.status === "available" ? "default" : "secondary"}>{item.status}</Badge>
                        <Badge 
                          variant={
                            item.approvalStatus === "approved" 
                              ? "default"
                              : item.approvalStatus === "rejected" 
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {item.approvalStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">₦{item.price?.toLocaleString()}</span>
                    {item.approvalStatus === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => updateItemApprovalStatus(item.id, "approved")}
                          className="hover-scale bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => updateItemApprovalStatus(item.id, "rejected")}
                          className="hover-scale"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMarketplaceItem(item.id)}
                      className="hover-scale"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="hover-lift animate-fade-in border-red-200" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Bulk Actions</h3>
              <p className="text-sm text-red-600 mb-4">
                These actions are irreversible. Please use with extreme caution.
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" className="hover-scale">
                  Delete All Expired Listings
                </Button>
                <Button variant="destructive" size="sm" className="hover-scale">
                  Clear All Analytics Data
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
