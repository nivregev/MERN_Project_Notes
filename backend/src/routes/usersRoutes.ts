import express from "express";
import * as UserControllers from "../controllers/usersControllers";

const router = express.Router();

router.post("/signup", UserControllers.signUp);

router.post("/login", UserControllers.login);

export default router;
