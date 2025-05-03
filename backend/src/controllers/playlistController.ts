import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createPlaylist = async (req: Request, res: Response) => {
    const { name, length, userId, songs } = req.body
    try {
        const product = await prisma.playlist.create({
            data: {
                name: name,
                length: length,
                userId: userId,
                songs: {
                    connect: songs.map((song: { id: number }) => ({ id: song.id })),
                }
            },
        })
        res.status(201).json(product)
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}