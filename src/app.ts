import express from "express";
import cors from "cors";
import UserRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import ContentRouter from "./routes/content.routes";
import LinkRouter from "./routes/link.routes";

const app = express();

// Update CORS configuration to handle multiple deployment URLs
const allowedOrigins = [
  // Vercel preview deployments typically have this pattern
  /^https:\/\/brainly-frontend[a-zA-Z0-9-]*.vercel.app$/,
  "http://localhost:5173",
  // Add your production URL when ready
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if the origin matches any of our patterns
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  exposedHeaders: ["Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204
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
      status: error.status || 500
    },
  });
});

export default app;
