import { Router } from "express";
import {
  CreateContent,
  GetContent,
  DeleteContent,
} from "../controllers/content.controller";
import { jwtAuth } from "../middleware/auth.middleware";

const ContentRouter = Router();

ContentRouter.route("/create-content").post(jwtAuth, CreateContent);
ContentRouter.route("/get-content").post(jwtAuth, GetContent);
ContentRouter.route("/delete-content").post(jwtAuth, DeleteContent);

export default ContentRouter;
