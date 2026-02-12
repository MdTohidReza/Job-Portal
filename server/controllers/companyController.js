import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'

// Register a new company

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const companyExits = await Company.findOne({email});
    if(companyExits){
        return res.json({success:false,message:"Company already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    const company = await Company.create({
        name,
        email,
        password:hashedPassword,
        image:imageUpload.secure_url
    })
    res.json({ success: true,
        company:{
            _id:company._id,
            name:company.name,
            email:company.email,
            image:company.image
        }
    });
  } catch (error) {}
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
