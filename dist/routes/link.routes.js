"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_controller_1 = require("../controllers/link.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const LinkRouter = (0, express_1.Router)();
LinkRouter.route("/create-link").post(auth_middleware_1.jwtAuth, link_controller_1.CreateLink);
LinkRouter.route("/content").post(link_controller_1.GetContentFromLink);
exports.default = LinkRouter;
