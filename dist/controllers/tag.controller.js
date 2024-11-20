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
exports.GetTags = exports.CreateTag = void 0;
const tags_model_1 = __importDefault(require("../models/tags.model"));
const tag_validator_1 = require("../utils/validators/tag.validator");
// not needed atm
const CreateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const isTitleValid = tag_validator_1.TagSchema.safeParse({ title });
        if (!isTitleValid.success) {
            res.status(411).json({
                message: "Validation Error",
            });
            return;
        }
        const existedTag = yield tags_model_1.default.findOne({
            title: title,
        });
        if (existedTag) {
            res.status(403).json({
                message: "Tag already existed",
            });
            return;
        }
        const newTag = yield tags_model_1.default.create({
            title: title,
        });
        res.status(200).json({
            message: "Tag Created Successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.CreateTag = CreateTag;
// not needed atm
const GetTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Tags = yield tags_model_1.default.find();
        if (!Tags) {
            res.status(404).json({
                message: "No Tags Found",
            });
        }
        res.status(200).json({
            message: "Tags Found",
            data: Tags,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.GetTags = GetTags;
