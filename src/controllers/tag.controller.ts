import TagModel from "../models/tags.model";
import { Request, Response } from "express";
import { TagSchema } from "../utils/validators/tag.validator";

// not needed atm
export const CreateTag = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  try {
    const isTitleValid = TagSchema.safeParse({ title });

    if (!isTitleValid.success) {
      res.status(411).json({
        message: "Validation Error",
      });
      return;
    }

    const existedTag = await TagModel.findOne({
      title: title,
    });

    if (existedTag) {
      res.status(403).json({
        message: "Tag already existed",
      });
      return;
    }

    const newTag = await TagModel.create({
      title: title,
    });

    res.status(200).json({
      message: "Tag Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// not needed atm
