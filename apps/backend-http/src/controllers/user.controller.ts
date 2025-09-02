import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types";


export const signupUser = (req: Request, res: Response) => {

    const data = createUserSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call

    res.json({
        message: "User signupn successfully"
    });
};

export const signinUser = (req: Request, res: Response) => {

    const data = signInSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const userId = 1;

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        token,
        message: "User signin successfully"
    });
};

export const createRoom = (req: Request, res: Response) => {

    const data = createRoomSchema.safeParse(req.body);

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call

    res.json({
        message: "Room created"
    })
}
