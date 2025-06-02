import { type NextRequest, NextResponse } from "next/server"
import { addMarketplaceItem } from "@/lib/google-sheets"
import { uploadImage } from "@/lib/cloudinary"

// Helper function to verify payment
async function verifyPayment(reference: string) {
  try {
    const response = await fetch("https://api.paystack.co/transaction/verify/" + reference, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return {
      success: data.status && data.data.status === "success",
      message: data.message,
      data: data.data
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return {
      success: false,
      message: "Failed to verify payment",
      error
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Log received data
    console.log("Received marketplace item upload request:", {
      title: formData.get("title"),
      category: formData.get("category"),
      imageCount: formData.get("imageCount"),
      contentType: request.headers.get("content-type")
    })

    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const whatsappNumber = formData.get("whatsappNumber") as string
    const sellerName = formData.get("sellerName") as string
    const imageCount = Number.parseInt(formData.get("imageCount") as string) || 0

    const imageUrls: string[] = []
    const imagePublicIds: string[] = []

    // Upload images
    for (let i = 0; i < imageCount; i++) {
      const file = formData.get(`image_${i}`) as File
      if (!file) {
        console.error(`Image ${i} is missing from form data`, {
          availableKeys: Array.from(formData.keys())
        })
        return NextResponse.json({ error: `Image ${i + 1} is missing` }, { status: 400 })
      }

      try {
        console.log(`Uploading image ${i + 1}/${imageCount}...`, {
          name: file.name,
          size: file.size,
          type: file.type
        })
        const uploadResult = (await uploadImage(file, "marketplace")) as any
        console.log(`Image ${i + 1} uploaded successfully:`, {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          format: uploadResult.format,
          size: uploadResult.bytes
        })
        imageUrls.push(uploadResult.secure_url)
        imagePublicIds.push(uploadResult.public_id)
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, {
          error: error,
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        })
        return NextResponse.json({ 
          error: "Failed to upload images",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }, { status: 500 })
      }
    }

    console.log("All images uploaded successfully:", {
      totalImages: imageUrls.length,
      urls: imageUrls,
      publicIds: imagePublicIds
    })

    // Add to Google Sheets
    const itemData = {
      ID: `MP${Date.now()}`,
      Title: title,
      Category: category,
      "Image URLs": imageUrls.join(","),
      "Image Public IDs": imagePublicIds.join(","),
      Description: description,
      Price: price,
      "WhatsApp Number": whatsappNumber,
      Status: "available",
      "Approval Status": "pending",
      "Date Posted": new Date().toISOString().split("T")[0],
      "Seller Name": sellerName,
    }

    console.log("Attempting to save item to Google Sheets:", itemData)

    const result = await addMarketplaceItem(itemData)

    if (result.success) {
      console.log("Item successfully saved to Google Sheets:", {
        id: itemData.ID,
        imageCount: imageUrls.length
      })
      return NextResponse.json({ 
        success: true, 
        item: {
          ...itemData,
          imageUrl: imageUrls[0], // Add main image URL for immediate display
          imageUrls: imageUrls,
          id: itemData.ID,
          approvalStatus: "pending"
        } 
      })
    } else {
      console.error("Failed to save item to Google Sheets:", {
        error: result.error,
        itemData: itemData
      })
      return NextResponse.json({ 
        error: result.error,
        details: "Failed to save item data"
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Error uploading marketplace item:", {
      error: error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ 
      error: "Failed to upload item",
      details: error instanceof Error ? error.message : "An unexpected error occurred"
    }, { status: 500 })
  }
}
