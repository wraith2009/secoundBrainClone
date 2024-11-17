import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main();
