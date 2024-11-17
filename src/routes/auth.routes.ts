import express from "express";
import { UserSignUp, UserSignIn } from "../controllers/auth.controller";

const UserRouter = express.Router();

UserRouter.post("/Signup", UserSignUp);

UserRouter.post("/Signin", UserSignIn);

export default UserRouter;
