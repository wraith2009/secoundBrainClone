"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTypes = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.contentTypes = ["Tweet", "Video", "Document", "Link"];
const ContentSchema = new mongoose_1.Schema({
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: exports.contentTypes,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: mongoose_1.default.Schema.Types.String,
            ref: "TagModel",
        },
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    content: {
        type: String,
    },
}, {
    timestamps: true,
});
const ContentModel = mongoose_1.default.model("ContentModel", ContentSchema);
exports.default = ContentModel;
