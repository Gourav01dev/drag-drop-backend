import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import shapeRoutes from "./routes/shapeRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Missing MongoURI");
}

app.use(cors());

app.use(express.json());

app.use("/api/shapes", shapeRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
