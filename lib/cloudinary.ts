import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File, folder: string) {
  try {
    console.log("Starting Cloudinary upload process:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folder: folder
    })

    // Verify Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary configuration missing:", {
        hasCloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
        hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
        hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET)
      })
      throw new Error("Cloudinary configuration is incomplete")
    }

    // Convert file to buffer
    console.log("Converting file to buffer...")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log("File converted to buffer successfully")

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      console.log("Creating Cloudinary upload stream...")
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `gpl-smarthub/${folder}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", {
              error: error,
              errorMessage: error.message,
              errorName: error.name,
              statusCode: error.http_code,
              details: error.message
            })
            reject(new Error(`Cloudinary upload failed: ${error.message}`))
          } else {
            console.log("Cloudinary upload success:", {
              publicId: result?.public_id,
              url: result?.secure_url,
              format: result?.format,
              size: result?.bytes
            })
            resolve(result)
          }
        },
      )

      console.log("Uploading buffer to Cloudinary...")
      uploadStream.end(buffer)
    })
  } catch (error) {
    console.error("Error in uploadImage function:", {
      error: error,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

export { cloudinary }
