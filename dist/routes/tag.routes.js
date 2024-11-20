"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const tagRouter = (0, express_1.Router)();
tagRouter.route("/createTag").post(tag_controller_1.CreateTag);
tagRouter.route("/getTags").get(tag_controller_1.GetTags);
exports.default = tagRouter;
