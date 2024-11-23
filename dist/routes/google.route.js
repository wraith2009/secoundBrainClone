"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const GoogleRouter = (0, express_1.Router)();
GoogleRouter.route("/google").get(auth_controller_1.googleLogin);
exports.default = GoogleRouter;
