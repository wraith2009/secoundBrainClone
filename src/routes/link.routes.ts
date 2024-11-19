import { Router } from "express";
import { CreateLink, GetContentFromLink } from "../controllers/link.controller";
import { jwtAuth } from "../middleware/auth.middleware";

const LinkRouter = Router();
LinkRouter.route("/create-link").post(jwtAuth, CreateLink);
LinkRouter.route("/content").post(GetContentFromLink);

export default LinkRouter;
