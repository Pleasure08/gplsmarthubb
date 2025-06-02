"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, ShoppingBag, Users, TrendingUp, Eye, DollarSign } from "lucide-react"

interface DashboardStats {
  totalHostels: number
  totalMarketplaceItems: number
  totalViews: number
  totalRevenue: number
  recentHostels: any[]
  recentItems: any[]
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalHostels: 0,
    totalMarketplaceItems: 0,
    totalViews: 0,
    totalRevenue: 0,
    recentHostels: [],
    recentItems: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch hostels
      const hostelResponse = await fetch("/api/hostels")
      const hostels = await hostelResponse.json()

      // Fetch marketplace items
      const marketplaceResponse = await fetch("/api/marketplace")
      const items = await marketplaceResponse.json()

      // Ensure we have arrays
      const hostelArray = Array.isArray(hostels) ? hostels : []
      const itemsArray = Array.isArray(items) ? items : []

      // Calculate stats
      const totalViews = hostelArray.reduce((sum: number, hostel: any) => sum + (hostel.views || 0), 0)
      const totalRevenue = itemsArray.reduce((sum: number, item: any) => sum + (item.price || 0), 0)

      setStats({
        totalHostels: hostelArray.length,
        totalMarketplaceItems: itemsArray.length,
        totalViews,
        totalRevenue,
        recentHostels: hostelArray.slice(0, 5),
        recentItems: itemsArray.slice(0, 5),
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Set default values on error
      setStats({
        totalHostels: 0,
        totalMarketplaceItems: 0,
        totalViews: 0,
        totalRevenue: 0,
        recentHostels: [],
        recentItems: [],
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hostels</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalHostels}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Marketplace Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMarketplaceItems}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Recent Hostels
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentHostels.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hostels yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentHostels.map((hostel, index) => (
                  <div key={hostel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{hostel.name}</p>
                      <p className="text-sm text-gray-600">{hostel.location}</p>
                    </div>
                    <Badge variant={hostel.status === "available" ? "default" : "secondary"}>{hostel.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover-lift animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-green-500" />
              Recent Marketplace Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No items yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₦{item.price?.toLocaleString()}</p>
                      <Badge variant={item.status === "available" ? "default" : "secondary"} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Platform Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-900">Active Platform</p>
              <p className="text-sm text-blue-700">All systems operational</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-900">Hostels Available</p>
              <p className="text-sm text-green-700">{stats.totalHostels} properties listed</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-900">Marketplace Active</p>
              <p className="text-sm text-purple-700">{stats.totalMarketplaceItems} items for sale</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
