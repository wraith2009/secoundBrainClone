import express from "express";
import cors from "cors";
import UserRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import ContentRouter from "./routes/content.routes";
import LinkRouter from "./routes/link.routes";

const app = express();

const corsOptions = {
  origin: [
    "https://brainly-frontend-ovevla22r-rahuls-projects-0785da91.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", tagRouter);
app.use("/api/v1", ContentRouter);
app.use("/api/v1", LinkRouter);

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
