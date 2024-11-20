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
exports.GetContentFromLink = exports.CreateLink = void 0;
const link_model_1 = __importDefault(require("../models/link.model"));
const uuid_1 = require("uuid");
const content_model_1 = __importDefault(require("../models/content.model"));
const CreateLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const uniqueToken = (0, uuid_1.v4)();
        const existingLink = yield link_model_1.default.findOne({ token: uniqueToken });
        if (existingLink) {
            res.status(500).json({
                message: "Internal Server Error",
            });
            return;
        }
        const newLink = yield link_model_1.default.create({
            token: uniqueToken,
            userId: userId,
        });
        if (!newLink) {
            res.status(500).json({
                message: "Internal Server Error",
            });
            return;
        }
        res.status(200).json({
            message: "Link Created Successfully",
            token: uniqueToken,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.CreateLink = CreateLink;
const GetContentFromLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const existingLink = yield link_model_1.default.findOne({ token });
        if (!existingLink) {
            res.status(404).json({
                message: "Link Not Found",
            });
            return;
        }
        const UserId = existingLink.userId;
        const Content = yield content_model_1.default.find({ userId: UserId });
        if (!Content) {
            res.status(404).json({
                message: "Content Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "Content Retrieved Successfully",
            content: Content,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.GetContentFromLink = GetContentFromLink;
