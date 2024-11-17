import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
  }
}
