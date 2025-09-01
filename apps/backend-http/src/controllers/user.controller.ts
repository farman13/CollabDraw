import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export const signupUser = (req: Request, res: Response) => {

    //db call

    res.json({
        message: "User signupn successfully"
    });
};

export const signinUser = (req: Request, res: Response) => {

    const userId = 1;

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        token,
        message: "User signin successfully"
    });
};

export const createRoom = (req: Request, res: Response) => {

    //db call

    res.json({
        message: "Room created"
    })
}
