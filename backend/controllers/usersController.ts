import User from "../models/usersModel.ts";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request , res: Response, next: NextFunction){
    const users = await User.find();
    res.status(200).json({
        status: 'sucesss', 
        data: users
    })
}