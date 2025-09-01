import { Router } from "express";
import { createRoom, signinUser, signupUser } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.route("/signup").post(signupUser);
userRouter.route("/signin").post(signinUser);
userRouter.route("/create-room").post(createRoom);


export { userRouter };