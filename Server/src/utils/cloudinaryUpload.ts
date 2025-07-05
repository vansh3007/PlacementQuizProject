import cloudinary from "@/config/coulidinary.config";

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string,
  filename: string,
  resourceType: "image" | "raw" = "image"
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          public_id: filename,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });
};
