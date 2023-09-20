import express from "express";
import * as UserControllers from "../controllers/usersControllers";

const router = express.Router();

router.post("/signup", UserControllers.signUp);

export default router;
