import { v2 as cloudinary } from "cloudinary";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ Cloudinary credentials missing in .env file!");
  console.error({
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "MISSING",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
      ? "SET"
      : "MISSING",
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("✅ Cloudinary configured:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key_preview: process.env.CLOUDINARY_API_KEY?.substring(0, 5) + "***",
  api_secret_preview:
    process.env.CLOUDINARY_API_SECRET?.substring(0, 5) + "***",
});

export default cloudinary;
