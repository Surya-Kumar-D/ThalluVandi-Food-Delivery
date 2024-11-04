import Items from "../models/itemsModel.ts";
import { Request, Response, NextFunction } from "express";
export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items = await Items.find();
  res.status(200).json({
    status: "successs",
    data: items,
  });
};
