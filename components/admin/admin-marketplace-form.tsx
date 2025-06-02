"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { X, Upload } from "lucide-react"

interface AdminMarketplaceFormProps {
  onSuccess?: () => void
}

export default function AdminMarketplaceForm({ onSuccess }: AdminMarketplaceFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    whatsappNumber: "",
    sellerName: "",
    status: "available",
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const categories = ["books", "electronics", "accessories", "clothing", "other"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (images.length + newFiles.length > 4) {
        toast({
          title: "Too many images",
          description: "You can upload maximum 4 images.",
          variant: "destructive",
        })
        return
      }
      setImages([...images, ...newFiles])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      console.log("Preparing to upload marketplace item...")
      const uploadData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        uploadData.append(key, value)
      })

      // Append all images
      images.forEach((image, index) => {
        uploadData.append(`image_${index}`, image)
      })
      uploadData.append("imageCount", images.length.toString())

      // Get the current origin
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      console.log("Current origin:", origin)
      console.log("Uploading item with data:", {
        title: formData.title,
        category: formData.category,
        imageCount: images.length
      })

      const response = await fetch(`${origin}/api/marketplace/upload`, {
        method: "POST",
        body: uploadData,
        credentials: 'include',
      })

      console.log("Upload response status:", response.status)
      const data = await response.json()
      console.log("Upload response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      if (data.success) {
        console.log("Item uploaded successfully:", data.item)
        toast({
          title: "Success!",
          description: "Marketplace item added successfully.",
        })

        // Reset form
        setFormData({
          title: "",
          category: "",
          description: "",
          price: "",
          whatsappNumber: "",
          sellerName: "",
          status: "available",
        })
        setImages([])

        // Reset file input
        const fileInput = document.getElementById("images") as HTMLInputElement
        if (fileInput) fileInput.value = ""

        // Call success callback to refresh data
        if (onSuccess) {
          onSuccess()
        }
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      console.error("Error adding marketplace item:", error)
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        })
      }
      setError(error instanceof Error ? error.message : "Failed to add item")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Item Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., iPhone 12 Pro Max"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="price">Price (₦)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
          <Input
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            placeholder="e.g., 2348123456789"
            required
          />
        </div>

        <div>
          <Label htmlFor="sellerName">Seller Name</Label>
          <Input
            id="sellerName"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleInputChange}
            placeholder="Seller's full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the item in detail..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Item Images (1-4 images)</Label>
        <Input id="images" type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < 4 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Upload className="h-4 w-4" />
            <span>You can upload {4 - images.length} more image(s)</span>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding Item..." : "Add Marketplace Item"}
      </Button>
    </form>
  )
}
