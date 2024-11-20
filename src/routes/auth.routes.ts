import { Router } from "express";
import { UserSignUp, UserSignIn } from "../controllers/auth.controller";
import { jwtAuth } from "../middleware/auth.middleware";

import { Request, Response } from "express";
const UserRouter = Router();

UserRouter.route("/Signup").post(UserSignUp);
UserRouter.route("/Signin").post(UserSignIn);

UserRouter.route("/verify-token").get(
  jwtAuth,
  (req: Request, res: Response): void => {
    res.status(200).json({ message: "Token is valid" });
  }
);

export default UserRouter;
