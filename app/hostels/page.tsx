"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { HostelCard } from "@/components/hostels/hostel-card"
import { SearchBar } from "@/components/ui/search-bar"
import { PriceRangeFilter } from "@/components/ui/price-range-filter"
import { LocationFilter } from "@/components/ui/location-filter"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { GridSettings } from "@/components/ui/grid-settings"
import type { Hostel } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: Number.POSITIVE_INFINITY })
  const [locationFilter, setLocationFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [gridSize, setGridSize] = useState("3x3")

  useEffect(() => {
    fetchHostels()
  }, [])

  useEffect(() => {
    filterHostels()
  }, [hostels, searchTerm, priceFilter, locationFilter])

  const fetchHostels = async () => {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        setLoading(true)
        console.log("Fetching hostels, attempt:", retryCount + 1)
        
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        console.log("Current origin:", origin)
        
        const response = await fetch(`${origin}/api/hostels`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store"
        })

        console.log("Response status:", response.status)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("Server error response:", errorData)
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched hostels:", data)
        
        if (!Array.isArray(data)) {
          console.error("Invalid data format received:", data)
          throw new Error("Invalid data format received from server")
        }

        setHostels(data)
        console.log(`Successfully loaded ${data.length} hostels`)
        break // Success, exit the retry loop
      } catch (error) {
        console.error("Error fetching hostels:", error)
        if (error instanceof Error) {
          console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
          })
        }
        
        retryCount++
        if (retryCount === maxRetries) {
          setHostels([]) // Set empty array after all retries fail
          toast({
            title: "Error",
            description: "Failed to load hostels. Please try again later.",
            variant: "destructive",
          })
        } else {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const filterHostels = () => {
    let filtered = hostels

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (hostel) =>
          hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hostel.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Price filter
    filtered = filtered.filter(
      (hostel) => hostel.pricePerYear >= priceFilter.minPrice && hostel.pricePerYear <= priceFilter.maxPrice,
    )

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((hostel) => hostel.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    setFilteredHostels(filtered)
  }

  const handlePriceFilterChange = (filters: { minPrice: number; maxPrice: number }) => {
    setPriceFilter(filters)
  }

  const handleLocationFilterChange = (location: string) => {
    setLocationFilter(location)
  }

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hostel-bg.jpeg')`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-in-up">
            Find Your Perfect Hostel
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            Discover verified student accommodations from our trusted partners
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-50">
        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search by name, location, or description..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <GridSettings gridSize={gridSize} onGridSizeChange={setGridSize} />
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in-up">
              <PriceRangeFilter onFilterChange={handlePriceFilterChange} title="Filter by Annual Price" />
              <LocationFilter
                onFilterChange={handleLocationFilterChange}
                placeholder="Enter location (e.g., Ikeja, Lagos)"
              />
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 animate-slide-in-up">
          <p className="text-gray-600">
            Showing {filteredHostels.length} of {hostels.length} hostels
            {(searchTerm ||
              priceFilter.minPrice > 0 ||
              priceFilter.maxPrice < Number.POSITIVE_INFINITY ||
              locationFilter) && <span className="text-orange-600 font-medium"> (filtered)</span>}
          </p>
        </div>

        {filteredHostels.length === 0 ? (
          <div className="text-center py-16 animate-slide-in-up">
            <p className="text-gray-500 text-lg mb-4">No hostels found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setPriceFilter({ minPrice: 0, maxPrice: Number.POSITIVE_INFINITY })
                setLocationFilter("")
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className={`grid ${getGridClasses()} gap-4 sm:gap-6 stagger-children`}>
            {filteredHostels.map((hostel, index) => (
              <div key={hostel.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <HostelCard hostel={hostel} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
