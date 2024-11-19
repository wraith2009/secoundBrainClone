import { Router } from "express";
import { UserSignUp, UserSignIn } from "../controllers/auth.controller";

const UserRouter = Router();

UserRouter.route("/Signup").post(UserSignUp);
UserRouter.route("/Signin").post(UserSignIn);

export default UserRouter;
