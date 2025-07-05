import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.config";
cloudinary.config({
  cloud_name: env.cloudinary.cloudinaryCloudName,
  api_key: env.cloudinary.cloudinaryApiKey,
  api_secret: env.cloudinary.cloudinaryApiSecret,
  secure: true,
});

export default cloudinary;
