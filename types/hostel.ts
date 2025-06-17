export interface Hostel {
  id: string
  name: string
  location: string
  pricePerYear: number
  imageUrls: string[]
  videoUrl?: string
  imagePublicIds: string[]
  videoPublicId?: string
  whatsappContact: string
  description: string
  status: string
  dateAdded: string
  views: number
} 