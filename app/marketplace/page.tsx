"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { MarketplaceCard } from "@/components/marketplace/marketplace-card"
import { SearchBar } from "@/components/ui/search-bar"
import { PriceRangeFilter } from "@/components/ui/price-range-filter"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, BookOpen, Laptop, Headphones, Shirt, Package, SlidersHorizontal } from "lucide-react"
import type { MarketplaceItem } from "@/lib/types"
import Link from "next/link"

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: Number.POSITIVE_INFINITY })
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Categories", icon: Package, color: "bg-gray-100" },
    { id: "books", name: "Books", icon: BookOpen, color: "bg-blue-100" },
    { id: "electronics", name: "Electronics", icon: Laptop, color: "bg-purple-100" },
    { id: "accessories", name: "Accessories", icon: Headphones, color: "bg-green-100" },
    { id: "clothing", name: "Clothing", icon: Shirt, color: "bg-pink-100" },
    { id: "other", name: "Other", icon: Package, color: "bg-yellow-100" },
  ]

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, searchTerm, selectedCategory, priceFilter])

  const fetchItems = async () => {
    try {
      setLoading(true)
      console.log("Fetching marketplace items...")
      
      // Get the current origin
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      console.log("Current origin:", origin)
      
      const response = await fetch(`${origin}/api/marketplace`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      console.log("Response status:", response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Server error response:", errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Fetched marketplace items:", data)
      
      if (!Array.isArray(data)) {
        console.error("Invalid data format received:", data)
        throw new Error("Invalid data format received from server")
      }
      
      // Log items and their approval status
      data.forEach(item => {
        console.log(`Item ${item.id}: ${item.title} - Approval Status: ${item.approvalStatus}`)
      })
      
      setItems(data)
      console.log(`Successfully loaded ${data.length} items`)
    } catch (error) {
      console.error("Error fetching marketplace items:", error)
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        })
      }
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    console.log("Filtering items...")
    console.log("Total items before filter:", items.length)
    
    // First filter for approved items and available status
    let filtered = items.filter(item => {
      const isApproved = item.approvalStatus?.toLowerCase() === "approved"
      const isAvailable = item.status?.toLowerCase() === "available"
      console.log(`Item ${item.id}: ${item.title} - Approved: ${isApproved}, Available: ${isAvailable}`)
      return isApproved && isAvailable
    })
    
    console.log("Items after approval and availability filter:", filtered.length)

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Price filter
    filtered = filtered.filter((item) => item.price >= priceFilter.minPrice && item.price <= priceFilter.maxPrice)

    console.log("Final filtered items count:", filtered.length)
    setFilteredItems(filtered)
  }

  const handlePriceFilterChange = (filters: { minPrice: number; maxPrice: number }) => {
    setPriceFilter(filters)
  }

  // Refresh data when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchItems()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Background */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/marketplace-bg.jpeg')`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-in-up">Student Marketplace</h1>
          <p className="text-xl text-white/90 mb-8 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            Buy and sell items within the student community safely and easily
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 hover-scale animate-slide-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/marketplace/sell">
              <Plus className="h-5 w-5 mr-2" />
              Start Selling
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-50">
        {/* Category Widgets */}
        <div className="mb-8 animate-slide-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer hover-lift transition-all duration-300 animate-slide-in-up ${
                    selectedCategory === category.id ? "ring-2 ring-orange-500" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <p className="text-sm font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search items, descriptions, or sellers..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="lg:w-auto w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Price Filter */}
          {showFilters && (
            <div className="max-w-md animate-slide-in-up">
              <PriceRangeFilter onFilterChange={handlePriceFilterChange} title="Filter by Item Price" />
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 animate-slide-in-up">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
            {(searchTerm ||
              selectedCategory !== "all" ||
              priceFilter.minPrice > 0 ||
              priceFilter.maxPrice < Number.POSITIVE_INFINITY) && (
              <span className="text-orange-600 font-medium"> (filtered)</span>
            )}
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 animate-slide-in-up">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">No items found matching your criteria.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceFilter({ minPrice: 0, maxPrice: Number.POSITIVE_INFINITY })
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
              <Button asChild className="hover-scale">
                <Link href="/marketplace/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  Be the first to sell
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {filteredItems.map((item, index) => (
              <div key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <MarketplaceCard item={item} onStatusUpdate={fetchItems} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
