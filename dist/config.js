"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_PASSWORD = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_PASSWORD = process.env.JWT_PASSWORD || "secret";
