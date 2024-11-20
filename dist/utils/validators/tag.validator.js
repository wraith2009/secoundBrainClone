"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const zod_1 = require("zod");
exports.TagSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "please Provide a Title"),
});
