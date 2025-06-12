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
import { GridSettings } from "@/components/ui/grid-settings"

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: Number.POSITIVE_INFINITY })
  const [showFilters, setShowFilters] = useState(false)
  const [showGridSettings, setShowGridSettings] = useState(false)
  const [gridSize, setGridSize] = useState("3x3")

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

  const getGridClasses = () => {
    switch (gridSize) {
      case "2x2":
        return "grid-cols-1 sm:grid-cols-2"
      case "3x3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case "3x4":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      case "4x4":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    }
  }

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
        className="relative bg-cover bg-center bg-no-repeat py-12 sm:py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/marketplace-bg.jpeg')`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-in-up">Student Marketplace</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            Buy and sell items within the student community safely and easily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 hover-scale animate-float"
            >
              <Link href="/marketplace/sell">
                <Plus className="h-5 w-5 mr-2" />
                Start Selling
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-50">
        {/* Search and Filter Section */}
        <div className="bg-white py-8 shadow-lg rounded-lg animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/2">
                <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search items..." />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover-scale"
                onClick={() => setShowFilters(!showFilters)}
                title="Toggle Price Filter"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover-scale"
                onClick={() => setShowGridSettings(!showGridSettings)}
                title="Toggle Grid Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 animate-slide-in-up">
                <PriceRangeFilter
                  onFilterChange={handlePriceFilterChange}
                  title="Filter by Price"
                />
              </div>
            )}

            {showGridSettings && (
              <div className="mt-4 animate-slide-in-up">
                <GridSettings gridSize={gridSize} onGridSizeChange={setGridSize} />
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="py-12">
          <div className={`grid ${getGridClasses()} gap-6 stagger-children`}>
            {filteredItems.map((item, index) => (
              <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MarketplaceCard item={item} onStatusUpdate={fetchItems} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
