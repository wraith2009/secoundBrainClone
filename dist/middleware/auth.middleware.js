"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const jwtAuth = (req, res, next) => {
    var _a, _b;
    try {
        const token = (_b = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) !== null && _b !== void 0 ? _b : "";
        if (!token) {
            res.status(403).json({ message: "No token provided." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        if (!decoded || typeof decoded !== "object" || !decoded.id) {
            res.status(403).json({ message: "Invalid token." });
        }
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        res.status(403).json({ message: "Token verification failed." });
    }
};
exports.jwtAuth = jwtAuth;
