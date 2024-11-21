import { Router } from "express";
import {
  CreateContent,
  GetContent,
  DeleteContent,
  UpdateContent,
} from "../controllers/content.controller";
import { jwtAuth } from "../middleware/auth.middleware";

const ContentRouter = Router();

ContentRouter.route("/create-content").post(jwtAuth, CreateContent);
ContentRouter.route("/get-content").post(GetContent);
ContentRouter.route("/delete-content").post(jwtAuth, DeleteContent);
ContentRouter.route("/update-content").post(jwtAuth, UpdateContent);

export default ContentRouter;
