import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModels from "../models/userModels";
import bcrypt from "bcrypt";

interface SignUpBody {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPasswordRaw = req.body.userPassword;

  try {
    if (!userName || !userEmail || !userPasswordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUserName = await userModels
      .findOne({ userName: userName })
      .exec();

    if (existingUserName) {
      throw createHttpError(
        409,
        "User NAME already taken. Please choose different or log in instead."
      );
    }

    const existingUserEmail = await userModels
      .findOne({ userEmail: userEmail })
      .exec();

    if (existingUserEmail) {
      throw createHttpError(
        409,
        "A user with this EMAIL already exist. Please log in instead."
      );
    }

    const passWordHashed = await bcrypt.hash(userPasswordRaw, 10);

    const newUser = await userModels.create({
      userName: userName,
      userEmail: userEmail,
      userPassword: passWordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
