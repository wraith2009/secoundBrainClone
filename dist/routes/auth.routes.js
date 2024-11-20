"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const UserRouter = (0, express_1.Router)();
UserRouter.route("/Signup").post(auth_controller_1.UserSignUp);
UserRouter.route("/Signin").post(auth_controller_1.UserSignIn);
UserRouter.route("/verify-token").get(auth_middleware_1.jwtAuth, (req, res) => {
    res.status(200).json({ message: "Token is valid" });
});
exports.default = UserRouter;
