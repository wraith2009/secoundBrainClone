import LinkModel from "../models/link.model";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import ContentModel from "../models/content.model";

export const CreateLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const uniqueToken = uuidv4();
    const existingLink = await LinkModel.findOne({ token: uniqueToken });

    if (existingLink) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    const newLink = await LinkModel.create({
      token: uniqueToken,
      userId: userId,
    });

    if (!newLink) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    res.status(200).json({
      message: "Link Created Successfully",
      token: uniqueToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const GetContentFromLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;

  try {
    const existingLink = await LinkModel.findOne({ token });
    if (!existingLink) {
      res.status(404).json({
        message: "Link Not Found",
      });
      return;
    }

    const UserId = existingLink.userId;

    const Content = await ContentModel.find({ userId: UserId });
    if (!Content) {
      res.status(404).json({
        message: "Content Not Found",
      });
      return;
    }

    res.status(200).json({
      message: "Content Retrieved Successfully",
      content: Content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
