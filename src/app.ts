import express from "express";
import cors from "cors";
import UserRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import ContentRouter from "./routes/content.routes";
import LinkRouter from "./routes/link.routes";

const app = express();

const allowedOrigins = [
  "https://brainly-frontend-sable.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = allowedOrigins.some(
      (allowedOrigin) => allowedOrigin === origin
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed.`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", tagRouter);
app.use("/api/v1", ContentRouter);
app.use("/api/v1", LinkRouter);

// Error handling middleware
app.use((req, res, next) => {
  const error: any = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  console.error(error); // Log the error for debugging
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

export default app;
