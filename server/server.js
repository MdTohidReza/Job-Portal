import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize express app
const app = express();

//connection to database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);

// Port
const PORT = process.env.PORT || 5000;

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
