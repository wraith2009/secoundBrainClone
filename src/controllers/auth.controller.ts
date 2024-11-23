import UserModel from "../models/user.model";
import { UserSchema } from "../utils/validators/auth.validator";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import axios from "axios";
import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const code = req.query.code as string | undefined;

  console.log("code", code);
  if (!code) {
    res.status(400).json({
      message: "Authorization code is required",
    });

    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );
    console.log(userRes);
    const { email } = userRes.data;
    console.log(email);
    if (!email) {
      res.status(400).json({
        message: "Failed to fetch user email from Google",
      });

      return;
    }

    let existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      existingUser = await UserModel.create({ email });
    }

    const { _id } = existingUser;

    const token = jwt.sign({ id: _id }, JWT_PASSWORD);

    res.status(200).json({
      token,
      message: "User Logged In Successfully",
      user: { ...existingUser.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

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
      if (!existedUser.password) {
        res.status(403).json({
          message: "Invalid Password",
        });
        return;
      }

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
        user: { ...existedUser.toObject(), password: undefined },
      });
    }
  } catch (error) {
    console.error("error during login", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
