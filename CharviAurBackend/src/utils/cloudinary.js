import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const safeDelete = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.warn("Temp file could not be deleted:", err.message);
    // Ignore deletion errors
  }
};

const uploadOnCloudinary = async (
  localFilePath,
  { resourceType = "auto" } = {}
) => {
  if (!localFilePath) return null;

  try {
    const uploadOptions = {
      resource_type: resourceType,
    };

    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );

    // Delete temp file after successful upload
    await safeDelete(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    await safeDelete(localFilePath);

    return null;
  }
};

const deleteOnCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  try {
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return null;
  }
};

export {
  uploadOnCloudinary,
  deleteOnCloudinary,
};