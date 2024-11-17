import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_PASSWORD = process.env.JWT_PASSWORD || "secret";
