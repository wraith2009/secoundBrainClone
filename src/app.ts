import express from "express";
import cors from "cors";
import UserRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import ContentRouter from "./routes/content.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", tagRouter);
app.use("/api/v1", ContentRouter);

app.get("/", (req, res) => {
  res.send("Hello World! is nodemon working hii");
});

app.use((req, res, next) => {
  const error: any = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
