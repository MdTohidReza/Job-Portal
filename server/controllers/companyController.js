import bcrypt from "bcrypt";
import fs from "fs/promises";
import Company from "../models/Company.js";
import generateToken from "../utils/generateToken.js";

// Register a new company

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  if (!imageFile) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Password validation (minimum 6 characters)
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    // Check if company already exists
    const companyExists = await Company.findOne({ email: email.toLowerCase() });
    if (companyExists) {
      return res.status(409).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to cloudinary
    let imageUpload;
    try {
      console.log("📁 Processing image file:", {
        filename: imageFile.originalname,
        size: imageFile.size,
        mimetype: imageFile.mimetype,
      });

      // Check file size (limit 5MB for MongoDB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Image file too large. Maximum size is 5MB",
        });
      }

      // Read file as buffer and convert to base64
      const fileBuffer = await fs.readFile(imageFile.path);
      const base64String = fileBuffer.toString("base64");
      const dataURI = `data:${imageFile.mimetype};base64,${base64String}`;

      console.log("✅ Image converted to base64 and ready for storage");
      imageUpload = {
        secure_url: dataURI,
      };

      // Clean up temp file
      try {
        await fs.unlink(imageFile.path);
      } catch (unlinkErr) {
        console.warn("Could not delete temp file:", unlinkErr.message);
      }
    } catch (fileError) {
      console.error("❌ Image processing failed:", fileError.message);

      // Clean up temp file
      try {
        await fs.unlink(imageFile.path);
      } catch (unlinkErr) {
        console.warn("Could not delete temp file:", unlinkErr.message);
      }

      return res.status(400).json({
        success: false,
        message: `Image processing failed: ${fileError.message}`,
      });
    }

    // Create company
    const company = await Company.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    // Generate token and send response
    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Register error:", error);

    // Handle specific errors
    if (error.message.includes("E11000")) {
      return res.status(409).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

//company login

export const loginCompany = async (req, res) => {};

//get company data
export const getCompanyData = async (req, res) => {};

//Post a new job

export const postJob = async (req, res) => {};

//get company applicants
export const getCompanyJobApplicants = async () => {};

//get company Posted job
export const getCompanyPostedJobs = async (req, res) => {};

//change job application status

export const changeJobApplicationStatus = async (req, res) => {};

//change job visibility
export const changeVisibility = async (req, res) => {};
