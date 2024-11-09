import Items from "../models/itemsModel.ts";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.ts";
export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items = await Items.find();
  if (!items.length) {
    return next(new AppError("No items found ", 404));
  }
  res.status(200).json({
    status: "success",
    data: items,
  });
};

export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await Items.find({ slug: req.params.slug }).select("-_id");
    if (!items.length) {
      return next(new AppError("No items found with the provided name", 404));
    }
    res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (err) {
    next(err);
  }
};
