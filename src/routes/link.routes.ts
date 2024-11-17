import express from "express";
import { CreateLink, GetContentFromLink } from "../controllers/link.controller";

const LinkRouter = express.Router();

LinkRouter.post("/create-link", CreateLink);
LinkRouter.get("/content", GetContentFromLink);

export default LinkRouter;
