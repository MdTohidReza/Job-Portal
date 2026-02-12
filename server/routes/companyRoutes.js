import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router();

//register company
router.post("/register",upload.single('image'), registerCompany);

//company login
router.post("/login", loginCompany);

//get company data
router.get("/company", getCompanyData);

//post a job
router.post("/post", postJob);

//get applicants data of company
router.get("/applicants", getCompanyJobApplicants);

//get company job list
router.get("/;ist-job", getCompanyPostedJobs);

//change application status
router.post("/change-status", changeJobApplicationStatus);

//change job visibility
router.post("/change-visibility", changeVisibility);

export default router;
