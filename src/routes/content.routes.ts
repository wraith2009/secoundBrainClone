import express from "express";
import {
  CreateContent,
  GetContent,
  DeleteContent,
} from "../controllers/content.controller";

const ContentRouter = express.Router();

ContentRouter.post("/create-content", CreateContent);
ContentRouter.get("/get-content", GetContent);
ContentRouter.get("/delete-content", DeleteContent);

export default ContentRouter;
