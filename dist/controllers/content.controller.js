"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContent = exports.DeleteContent = exports.GetContent = exports.CreateContent = void 0;
const content_model_1 = __importDefault(require("../models/content.model"));
const content_validator_1 = require("../utils/validators/content.validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const tags_model_1 = __importDefault(require("../models/tags.model"));
const CreateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, title, tags, userId, link, content } = req.body;
    let newTitle = "";
    if (title.length > 15) {
        newTitle = title.substring(0, 15);
    }
    else {
        newTitle = title;
    }
    try {
        const isValidContent = content_validator_1.ContentSchema.safeParse({
            type,
            title,
            tags,
            userId,
            link,
            content,
        });
        if (!isValidContent.success) {
            res.status(411).json({
                message: "Validation Error",
                errors: isValidContent.error.format(),
            });
            return;
        }
        if (!Array.isArray(tags)) {
            res.status(400).json({
                message: "tags must be an array",
            });
            return;
        }
        const tagtitle = yield Promise.all(tags.map((tagTitle) => __awaiter(void 0, void 0, void 0, function* () {
            let tag = yield tags_model_1.default.findOne({ title: tagTitle });
            if (!tag) {
                tag = yield tags_model_1.default.create({ title: tagTitle });
            }
            return tag.title;
        })));
        const newContent = yield content_model_1.default.create({
            type,
            title: newTitle,
            tags: tagtitle,
            userId,
            link,
            content,
        });
        res.status(200).json({
            message: "Content Created Successfully",
            content: newContent,
        });
    }
    catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.CreateContent = CreateContent;
const GetContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const existingUser = yield user_model_1.default.findById(userId);
        if (!existingUser) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const content = yield content_model_1.default.find({ userId });
        res.status(200).json({
            message: "Content Retrieved Successfully",
            content: content,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.GetContent = GetContent;
const DeleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const existingContent = yield content_model_1.default.findById(contentId);
        if (!existingContent) {
            res.status(404).json({
                message: "Content not found",
            });
            return;
        }
        yield content_model_1.default.deleteOne({ _id: contentId });
        res.status(200).json({
            message: "Content Deleted Successfully",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.DeleteContent = DeleteContent;
const UpdateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, type, title, tags, link, content } = req.body;
    try {
        const getContent = yield content_model_1.default.findById(contentId);
        if (!getContent) {
            res.status(404).json({
                message: "Content not found",
            });
            return;
        }
        const updatedContent = yield content_model_1.default.findByIdAndUpdate(contentId, {
            $set: {
                type,
                title,
                tags,
                link,
                content,
            },
        }, { new: true });
        res.status(200).json({
            message: "Content Updated Successfully",
            content: updatedContent,
        });
    }
    catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.UpdateContent = UpdateContent;
