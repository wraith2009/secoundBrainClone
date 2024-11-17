import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://rbh97995:1sHGU5Wd9szu9LdO@cluster0.3y6ur.mongodb.net/";
