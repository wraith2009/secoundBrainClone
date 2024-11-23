import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main();
