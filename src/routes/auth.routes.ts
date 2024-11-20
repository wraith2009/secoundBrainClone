import { Router } from "express";
import { UserSignUp, UserSignIn } from "../controllers/auth.controller";
import { jwtAuth } from "../middleware/auth.middleware";

const UserRouter = Router();

UserRouter.route("/Signup").post(UserSignUp);
UserRouter.route("/Signin").post(UserSignIn);
UserRouter.route("/Check-login").post(jwtAuth);

export default UserRouter;
