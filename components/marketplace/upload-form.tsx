"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { X, Upload } from "lucide-react"

interface UploadFormProps {
  onSuccess?: (data: any) => void
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    whatsappNumber: "",
    sellerName: "",
    status: "available",
    approvalStatus: "pending",
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

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
      // File size check
      for (const file of newFiles) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `Each image must be less than 10MB. '${file.name}' is too large.`,
            variant: "destructive",
          })
          return
        }
      }
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
      
      const response = await fetch(`${origin}/api/marketplace/upload`, {
        method: "POST",
        body: uploadData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      if (data.success) {
        toast({
          title: "Success!",
          description: "Your item has been submitted for review. It will appear in the marketplace once approved.",
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
          approvalStatus: "pending",
        })
        setImages([])

        // Reset file input
        const fileInput = document.getElementById("upload-images") as HTMLInputElement
        if (fileInput) fileInput.value = ""

        // Call success callback with the item data
        if (onSuccess) {
          onSuccess(data.item)
        }
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      console.error("Error uploading item:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload item. Please try again.",
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

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">Important Notice</h3>
        <p className="text-orange-700 text-sm">
          Your item will be reviewed by an admin before it appears in the marketplace.
          This usually takes 1-2 business days.
        </p>
      </div>

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

        <div className="md:col-span-2">
          <Label htmlFor="sellerName">Your Name</Label>
          <Input
            id="sellerName"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleInputChange}
            placeholder="Your full name"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your item in detail..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="upload-images">Item Images (1-4 images)</Label>
        <Input id="upload-images" type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />

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
        {loading ? "Saving..." : "Save Item Details"}
      </Button>
    </form>
  )
}
