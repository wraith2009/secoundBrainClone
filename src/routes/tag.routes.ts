import express from "express";
import { CreateTag, GetTags } from "../controllers/tag.controller";

const tagRouter = express.Router();

tagRouter.post("/createTag", CreateTag);
tagRouter.get("/getTag", GetTags);

export default tagRouter;
