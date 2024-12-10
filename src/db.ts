import mongoose from "mongoose";
import { MONGODB_URI } from "./config";
import { Pinecone } from "@pinecone-database/pinecone";
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

const PINECONE_API_KEY = process.env.PINECOME_API_KEY;

if (!PINECONE_API_KEY) {
  throw new Error("Missing Pinecone API Key in environment variables.");
}

export const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
});
