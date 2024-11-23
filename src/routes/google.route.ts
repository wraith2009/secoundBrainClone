import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller";
const GoogleRouter = Router();

GoogleRouter.route("/google").get(googleLogin);

export default GoogleRouter;
