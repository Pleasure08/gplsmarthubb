"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { X, Upload } from "lucide-react"

interface AdminHostelFormProps {
  onSuccess?: () => void
}

export function AdminHostelForm({ onSuccess }: AdminHostelFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerYear: "",
    whatsappContact: "",
    description: "",
    status: "available",
  })
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

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
      const uploadData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        uploadData.append(key, value)
      })

      // Append all images
      images.forEach((image, index) => {
        uploadData.append(`image_${index}`, image)
      })
      uploadData.append("imageCount", images.length.toString())

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      const response = await fetch(`${baseUrl}/api/admin/hostels`, {
        method: "POST",
        body: uploadData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success!",
          description: "Hostel added successfully.",
        })

        // Reset form
        setFormData({
          name: "",
          location: "",
          pricePerYear: "",
          whatsappContact: "",
          description: "",
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
      console.error("Error adding hostel:", error)
      setError(error instanceof Error ? error.message : "Failed to add hostel")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add hostel. Please try again.",
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
          <Label htmlFor="name">Hostel Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Sunrise Hostel"
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Ikeja, Lagos"
            required
          />
        </div>

        <div>
          <Label htmlFor="pricePerYear">Price Per Year (₦)</Label>
          <Input
            id="pricePerYear"
            name="pricePerYear"
            type="number"
            value={formData.pricePerYear}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="whatsappContact">WhatsApp Contact</Label>
          <Input
            id="whatsappContact"
            name="whatsappContact"
            value={formData.whatsappContact}
            onChange={handleInputChange}
            placeholder="e.g., 2348123456789"
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
            <option value="full">Full</option>
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
          placeholder="Describe the hostel facilities, amenities, etc..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Hostel Images (1-4 images)</Label>
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
        {loading ? "Adding Hostel..." : "Add Hostel"}
      </Button>
    </form>
  )
}
