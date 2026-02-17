import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Base64 encoded image or URL
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Company = mongoose.model("Company", companySchema);
export default Company;
