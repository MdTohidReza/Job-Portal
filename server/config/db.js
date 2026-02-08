import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected"),
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "job-portal",
    });
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

// sentry is the application monitoring and error tracking tool that helps developers identify and fix issues in their applications.
// It provides real-time insights into errors, performance issues, and other critical events, allowing developers to quickly address problems and improve the overall user experience.
// Sentry supports various programming languages and frameworks, making it a versatile solution for monitoring applications across different platforms.
