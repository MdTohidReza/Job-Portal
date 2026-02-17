import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";

// Initialize express app
const app = express();

//connection to database
await connectDB();
await connectCloudinary;

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Test Cloudinary credentials
app.get("/api/test-cloudinary", async (req, res) => {
  try {
    const result = await connectCloudinary.api.resources({ max_results: 1 });
    res.json({
      success: true,
      message: "Cloudinary authentication successful",
      cloudinary_config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: "***SET***",
        api_secret: "***SET***",
      },
    });
  } catch (error) {
    console.error("Cloudinary test failed:", error);
    res.status(403).json({
      success: false,
      message: "Cloudinary authentication failed",
      error: error.message,
      http_code: error.http_code,
      status: error.status,
      cloudinary_config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key_set: !!process.env.CLOUDINARY_API_KEY,
        api_secret_set: !!process.env.CLOUDINARY_API_SECRET,
      },
    });
  }
});

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Error handler for multer and other errors (MUST be AFTER routes)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB",
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

Sentry.setupExpressErrorHandler(app);

// Start Server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start");
    console.log(error.message);
  }
};

startServer();
