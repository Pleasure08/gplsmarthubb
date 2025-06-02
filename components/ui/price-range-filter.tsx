"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DollarSign, Filter } from "lucide-react"

interface PriceRangeFilterProps {
  onFilterChange: (filters: { minPrice: number; maxPrice: number }) => void
  placeholder?: string
  title?: string
}

export function PriceRangeFilter({
  onFilterChange,
  placeholder = "Price Range",
  title = "Filter by Price",
}: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleApplyFilter = () => {
    onFilterChange({
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY,
    })
  }

  const handleClearFilter = () => {
    setMinPrice("")
    setMaxPrice("")
    onFilterChange({
      minPrice: 0,
      maxPrice: Number.POSITIVE_INFINITY,
    })
  }

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-orange-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice" className="text-xs">
              Min Price (₦)
            </Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="text-xs">
              Max Price (₦)
            </Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-8"
            />
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
