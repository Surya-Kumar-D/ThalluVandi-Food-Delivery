import User from "../models/usersModel.ts";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../utils/appError.ts";

dotenv.config();

const signInToken = (userId: Object) => {
  if (process.env.JWT_SECRET)
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signInToken(newUser._id);
    if (process.env.JWT_COOKIE_EXPIRES_IN) {
      const cookieExpiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10);
      if (isNaN(cookieExpiresIn)) {
        return next(new AppError("Invalid JWT_COOKIE_EXPIRES_IN value", 500));
      }

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    newUser.password = undefined!;
    res.status(201).json({
      status: "success",

      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  // @ts-ignore
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (!process.env.JWT_SECRET) {
    return next(new AppError("there was an error", 500));
  }
  const token = signInToken(user._id);
  if (process.env.JWT_COOKIE_EXPIRES_IN) {
    const cookieExpiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10);
    if (isNaN(cookieExpiresIn)) {
      return next(new AppError("Invalid JWT_COOKIE_EXPIRES_IN value", 500));
    }

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
    });
  }
  res.status(200).json({
    status: "success",
  });
};

export const checkAuth = async (req: Request, res: Response) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    console.log(req);
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ authenticated: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const user = await User.findById(decoded.id);
    console.log(user);
    if (!user)
      return res
        .status(401)
        .json({ authenticated: false, message: "User not found" });

    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ authenticated: false, message: "Invalid or expired token" });
  }
};
