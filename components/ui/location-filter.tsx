"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Filter } from "lucide-react"

interface LocationFilterProps {
  onFilterChange: (location: string) => void
  placeholder?: string
}

export function LocationFilter({ onFilterChange, placeholder = "Enter location..." }: LocationFilterProps) {
  const [location, setLocation] = useState("")

  const popularLocations = [
    "Ikeja, Lagos",
    "Victoria Island, Lagos",
    "Lekki, Lagos",
    "Surulere, Lagos",
    "Yaba, Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Kano",
    "Enugu",
  ]

  const handleApplyFilter = () => {
    onFilterChange(location)
  }

  const handleClearFilter = () => {
    setLocation("")
    onFilterChange("")
  }

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
    onFilterChange(selectedLocation)
  }

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-orange-500" />
          Filter by Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="location" className="text-xs">
            Location
          </Label>
          <Input
            id="location"
            placeholder={placeholder}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-8"
          />
        </div>

        <div>
          <Label className="text-xs text-gray-600">Popular Locations</Label>
          <div className="grid grid-cols-1 gap-1 mt-2 max-h-32 overflow-y-auto">
            {popularLocations.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocationSelect(loc)}
                className="text-left text-xs p-1 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleApplyFilter} size="sm" className="flex-1 h-8">
            <Filter className="h-3 w-3 mr-1" />
            Apply
          </Button>
          <Button onClick={handleClearFilter} variant="outline" size="sm" className="h-8">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
