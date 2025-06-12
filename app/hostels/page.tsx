"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { HostelCard } from "@/components/hostels/hostel-card"
import { SearchBar } from "@/components/ui/search-bar"
import { PriceRangeFilter } from "@/components/ui/price-range-filter"
import { LocationFilter } from "@/components/ui/location-filter"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Building, MapPin } from "lucide-react"
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
  const [showGridSettings, setShowGridSettings] = useState(false)
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <Button className="bg-white text-orange-500 hover:bg-gray-100 hover-scale animate-float">
              <Building className="h-5 w-5 mr-2" />
              Browse All Hostels
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white py-8 shadow-lg relative z-10 animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search hostels..." />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover-scale"
              onClick={() => setShowFilters(!showFilters)}
              title="Toggle Filters"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-slide-in-up">
              <LocationFilter onFilterChange={handleLocationFilterChange} />
              <PriceRangeFilter
                onFilterChange={handlePriceFilterChange}
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
      <div className="container mx-auto px-4 py-12">
        <div className={`grid ${getGridClasses()} gap-6 stagger-children`}>
          {filteredHostels.map((hostel, index) => (
            <div key={hostel.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <HostelCard hostel={hostel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
