export interface Hostel {
  id: string
  name: string
  location: string
  pricePerYear: number
  imageUrl: string
  imagePublicId: string
  whatsappContact: string
  description: string
  status: "available" | "full"
  dateAdded: string
  views: number
}

export interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  category: string
  sellerName: string
  whatsappNumber: string
  imageUrl?: string
  images?: string[]
  status: "available" | "sold" | "pending"
  approvalStatus: "pending" | "approved" | "rejected"
  datePosted: string
}

export interface PaymentData {
  email: string
  amount: number
  reference: string
}
