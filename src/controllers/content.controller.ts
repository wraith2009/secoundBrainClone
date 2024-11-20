import ContentModel from "../models/content.model";
import { Request, Response } from "express";
import { ContentSchema } from "../utils/validators/content.validator";
import UserModel from "../models/user.model";
import TagModel from "../models/tags.model";

export const CreateContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, title, tags, userId, link, content } = req.body;

  try {
    const isValidContent = ContentSchema.safeParse({
      type,
      title,
      tags,
      userId,
      link,
      content,
    });

    if (!isValidContent.success) {
      res.status(411).json({
        message: "Validation Error",
        errors: isValidContent.error.format(),
      });
      return;
    }

    if (!Array.isArray(tags)) {
      res.status(400).json({
        message: "tags must be an array",
      });
      return;
    }

    const tagtitle = await Promise.all(
      tags.map(async (tagTitle: string) => {
        let tag = await TagModel.findOne({ title: tagTitle });

        if (!tag) {
          tag = await TagModel.create({ title: tagTitle });
        }

        return tag.title;
      })
    );

    const newContent = await ContentModel.create({
      type,
      title,
      tags: tagtitle,
      userId,
      link,
      content,
    });

    res.status(200).json({
      message: "Content Created Successfully",
      content: newContent,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const GetContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const content = await ContentModel.find({ userId });

    res.status(200).json({
      message: "Content Retrieved Successfully",
      content: content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const DeleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contentId } = req.body;
  try {
    const existingContent = await ContentModel.findById(contentId);
    if (!existingContent) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    await ContentModel.deleteOne({ _id: contentId });
    res.status(200).json({
      message: "Content Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const UpdateContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contentId, type, title, tags, link, content } = req.body;

  try {
    const getContent = await ContentModel.findById(contentId);
    if (!getContent) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }
    const updatedContent = await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          type,
          title,
          tags,
          link,
          content,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Content Updated Successfully",
      content: updatedContent,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
