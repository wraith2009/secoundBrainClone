"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const tag_routes_1 = __importDefault(require("./routes/tag.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const link_routes_1 = __importDefault(require("./routes/link.routes"));
const google_route_1 = __importDefault(require("./routes/google.route"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://brainly-frontend-sable.vercel.app",
    "http://localhost:5173",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        const isAllowed = allowedOrigins.some((allowedOrigin) => allowedOrigin === origin);
        if (isAllowed) {
            callback(null, true);
        }
        else {
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
app.use((0, cors_1.default)(corsOptions));
// Other middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Health check route
app.get("/", (req, res) => {
    res.send("API is running");
});
// Routes
app.use("/api/v1/auth", google_route_1.default);
app.use("/api/v1", auth_routes_1.default);
app.use("/api/v1", tag_routes_1.default);
app.use("/api/v1", content_routes_1.default);
app.use("/api/v1", link_routes_1.default);
// Error handling middleware
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    console.error(error); // Log the error for debugging
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status || 500,
        },
    });
});
exports.default = app;
