import { Router } from "express";
import { CreateTag, GetTags } from "../controllers/tag.controller";

const tagRouter = Router();

tagRouter.route("/createTag").post(CreateTag);
tagRouter.route("/getTags").get(GetTags);

export default tagRouter;
