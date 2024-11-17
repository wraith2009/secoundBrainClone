import express from "express";
import { CreateTag } from "../controllers/tag.controller";

const tagRouter = express.Router();

tagRouter.post("/createTag", CreateTag);

export default tagRouter;
