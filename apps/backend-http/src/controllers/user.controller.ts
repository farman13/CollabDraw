import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";


export const signupUser = async (req: Request, res: Response) => {

    const parsedData = createUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call
    try {
        await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            message: "User signupn successfully"
        });
    }
    catch (e) {
        res.json({
            message: "User already exist with this username or email"
        })
    }

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
