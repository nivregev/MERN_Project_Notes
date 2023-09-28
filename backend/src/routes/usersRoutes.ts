import express from "express";
import * as UserControllers from "../controllers/usersControllers";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserControllers.getAuthenticatedUser);

router.post("/signup", UserControllers.signUp);

router.post("/login", UserControllers.login);

router.post("/logout", UserControllers.logout);

export default router;
