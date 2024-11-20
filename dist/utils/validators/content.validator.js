"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSchema = void 0;
const zod_1 = require("zod");
exports.ContentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "please insert title"),
    type: zod_1.z.string().min(1, "please insert type").max(10, "type is too big"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "please insert tags")).optional(),
    userId: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    link: zod_1.z.string().optional(),
});
