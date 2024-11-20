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
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/api/v1", auth_routes_1.default);
app.use("/api/v1", tag_routes_1.default);
app.use("/api/v1", content_routes_1.default);
app.use("/api/v1", link_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World! is nodemon working hii");
});
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
exports.default = app;