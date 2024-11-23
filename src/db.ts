import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

export async function connectDB() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
  }
}
