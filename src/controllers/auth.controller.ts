import UserModel from "../models/user.model";
import { UserSchema } from "../utils/validators/auth.validator";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const UserSignUp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const isValidData = UserSchema.safeParse({ email, password });

    if (!isValidData.success) {
      res.status(411).json({
        message: "Validation Error",
      });
      return;
    }

    const existedUser = await UserModel.findOne({
      email: email,
    });

    if (existedUser) {
      res.status(403).json({
        message: "User already existed",
      });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const UserSignIn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const isValidData = UserSchema.safeParse({ email, password });

    if (!isValidData.success) {
      res.status(400).json({
        message: "Validation Error",
      });
      return;
    }

    const existedUser = await UserModel.findOne({
      email: email,
    });

    if (!existedUser) {
      res.status(403).json({
        message: "Wrong email",
      });
    }

    if (existedUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existedUser.password
      );

      if (!isPasswordValid) {
        res.status(403).json({
          message: "Invalid Password",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: existedUser._id,
        },
        JWT_PASSWORD
      );

      res.status(200).json({
        message: "User Logged In Successfully",
        token,
        user: existedUser,
      });
    }
  } catch (error) {
    console.error("error during login", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
