import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModels from "../models/userModels";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.session.userId;
  try {
    if (!authenticatedUser) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await userModels
      .findById(authenticatedUser)
      .select("+userEmail")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  userName?: string;
  userPassword?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  try {
    if (!userName || !userPassword) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await userModels
      .findOne({ userName: userName })
      .select("+userPassword +userEmail")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
