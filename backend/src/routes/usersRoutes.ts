import express from "express";
import * as UserControllers from "../controllers/usersControllers";

const router = express.Router();

router.get("/", UserControllers.getAuthenticatedUser);

router.post("/signup", UserControllers.signUp);

router.post("/login", UserControllers.login);

router.post("/logout", UserControllers.logout);

export default router;
