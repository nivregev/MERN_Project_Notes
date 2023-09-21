import mongoose from "mongoose";

declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}

//need to learn more about express-session
