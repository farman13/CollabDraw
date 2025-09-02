import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";


export const signupUser = async (req: Request, res: Response) => {

    const parsedData = createUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id,
            message: "User signup successfully"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exist with this username or email"
        })
    }

};

export const signinUser = async (req: Request, res: Response) => {

    const parsedData = signInSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "User not exist with this email"
        })
    }

    const validUser = await bcrypt.compare(parsedData.data.password, user?.password);

    if (!validUser) {
        return res.status(403).json({
            message: "Incoorect Password"
        })
    }

    const token = jwt.sign({ userId: user?.id }, JWT_SECRET);

    res.json({
        token,
        message: "User signin successfully"
    });
};

export const createRoom = async (req: Request, res: Response) => {

    const parsedData = createRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.log(parsedData.data);
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call
    //@ts-ignore
    const userId = req.userId
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id,
            message: "Room created"

        })
    } catch (e) {
        res.status(411).json({
            message: "Room already created with this name"
        })
    }
}
