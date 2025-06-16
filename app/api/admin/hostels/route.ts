import { type NextRequest, NextResponse } from "next/server"
import { addHostel } from "@/lib/google-sheets"
import { uploadImage, uploadVideo } from "@/lib/cloudinary"

const allowedOrigins = [
  'https://gplsmarthub.com.ng',
  'https://www.gplsmarthub.com.ng',
];

function setCORSHeaders(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Admin Hostel Upload Started ===")

    const formData = await request.formData()
    console.log("Form data received")

    const name = formData.get("name") as string
    const location = formData.get("location") as string
    const pricePerYear = formData.get("pricePerYear") as string
    const whatsappContact = formData.get("whatsappContact") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const imageCount = Number.parseInt(formData.get("imageCount") as string) || 0
    const hasVideo = formData.get("hasVideo") === "true"

    console.log("Form fields:", { name, location, pricePerYear, whatsappContact, status, imageCount, hasVideo })

    if (imageCount === 0) {
      console.log("No images provided")
      const response = NextResponse.json({ error: "At least one image is required" }, { status: 400 });
      return setCORSHeaders(request, response);
    }

    if (imageCount > 3) {
      console.log("Too many images")
      const response = NextResponse.json({ error: "Maximum 3 images allowed" }, { status: 400 });
      return setCORSHeaders(request, response);
    }

    // Verify Cloudinary configuration
    console.log("Verifying Cloudinary configuration...")
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary credentials:", {
        hasCloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
        hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
        hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET)
      })
      const response = NextResponse.json({ error: "Cloudinary configuration missing" }, { status: 500 });
      return setCORSHeaders(request, response);
    }
    console.log("Cloudinary configuration verified")

    // Upload all images to Cloudinary
    const imageUrls: string[] = []
    const imagePublicIds: string[] = []

    for (let i = 0; i < imageCount; i++) {
      const file = formData.get(`image_${i}`) as File
      if (file) {
        console.log(`Uploading image ${i + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size
        })
        const uploadResult = (await uploadImage(file, "hostels")) as any
        console.log(`Image ${i + 1} upload result:`, {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id
        })
        imageUrls.push(uploadResult.secure_url)
        imagePublicIds.push(uploadResult.public_id)
      }
    }

    console.log("All images uploaded successfully:", {
      totalImages: imageUrls.length,
      urls: imageUrls,
      publicIds: imagePublicIds
    })

    // Upload video if provided
    let videoUrl = ""
    let videoPublicId = ""
    if (hasVideo) {
      const videoFile = formData.get("video") as File
      if (videoFile) {
        console.log("Uploading video:", {
          name: videoFile.name,
          type: videoFile.type,
          size: videoFile.size
        })
        const videoUploadResult = (await uploadVideo(videoFile, "hostels")) as any
        console.log("Video upload result:", {
          url: videoUploadResult.secure_url,
          publicId: videoUploadResult.public_id
        })
        videoUrl = videoUploadResult.secure_url
        videoPublicId = videoUploadResult.public_id
      }
    }

    // Prepare data for Google Sheets
    const hostelData = {
      ID: `H${Date.now()}`,
      Name: name,
      Location: location,
      "Price Per Year": pricePerYear,
      "Image URLs": imageUrls.join(","),
      "Image Public IDs": imagePublicIds.join(","),
      "Video URL": videoUrl,
      "Video Public ID": videoPublicId,
      "WhatsApp Contact": whatsappContact,
      Description: description,
      Status: status || "available",
      "Date Added": new Date().toISOString().split("T")[0],
      Views: "0",
    }

    console.log("Hostel data prepared:", hostelData)

    // Add to Google Sheets
    console.log("Starting Google Sheets upload...")
    const result = await addHostel(hostelData)
    console.log("Google Sheets result:", result)

    if (result.success) {
      console.log("=== Admin Hostel Upload Completed Successfully ===")
      const response = NextResponse.json({ 
        success: true, 
        hostel: {
          ...hostelData,
          imageUrls: imageUrls,
          videoUrl: videoUrl,
          id: hostelData.ID
        }
      });
      return setCORSHeaders(request, response);
    } else {
      console.error("Google Sheets returned error:", result.error)
      const response = NextResponse.json({ error: result.error }, { status: 500 });
      return setCORSHeaders(request, response);
    }
  } catch (error) {
    console.error("=== Admin Hostel Upload Failed ===")
    console.error("Error details:", error)
    const response = NextResponse.json(
      {
        error: "Failed to add hostel",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
    return setCORSHeaders(request, response);
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, {
    status: 204, // No Content for successful preflight
  });
  response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
  return setCORSHeaders(request, response);
}
