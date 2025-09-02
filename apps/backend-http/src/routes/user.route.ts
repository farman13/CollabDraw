import { Router } from "express";
import { createRoom, signinUser, signupUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const userRouter: Router = Router();

userRouter.route("/signup").post(signupUser);
userRouter.route("/signin").post(signinUser);
userRouter.route("/create-room").post(auth, createRoom);


export { userRouter };