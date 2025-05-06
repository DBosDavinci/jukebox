import { Request, Response } from "express";
import prisma from "../prisma/client";

export async function getPlaylistById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
        const playlist = await prisma.playlist.findUnique({ where: { id: id }, include: { songs: true } });
        res.status(200).json(playlist);
    } catch (err) {
        console.error("Playlist error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPlaylistByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
    try {
        const playlists = await prisma.playlist.findMany({ where: { userId: userId } });
        res.status(200).json(playlists);
    } catch (err) {
        console.error("Playlist error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createPlaylist = async (req: Request, res: Response) => {
    const { name, length, userId, songs } = req.body
    try {
        const playlist = await prisma.playlist.create({
            data: {
                name: name,
                length: length,
                userId: userId,
                songs: {
                    connect: songs.map((song: { id: number }) => ({ id: song.id })),
                }
            },
        })
        res.status(201).json(playlist)
    } catch (err) {
        console.error("Playlist error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePlaylist = async (req: Request, res: Response) => {
    const { name, songs }: { name?: string; songs?: number[] } = req.body;
    const id = parseInt(req.params.id, 10);

    try {
        await prisma.$transaction(async (tx) => {
            const updateData: any = {};

            if (name !== undefined) {
                updateData.name = name;
            }

            if (songs !== undefined) {
                updateData.songs = {
                    set: songs.map((songId) => ({ id: songId })),
                };
            }

            await tx.playlist.update({
                where: { id },
                data: updateData,
            });

            const updated = await tx.playlist.findUnique({
                where: { id },
                include: { songs: true },
            });

            await tx.playlist.update({
                where: { id },
                data: { length: updated?.songs.reduce((sum, song) => sum + song.length, 0) || 0 },
            });
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Playlist update error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeSongFromPlaylist = async (req: Request, res: Response) => {
    const songId = parseInt(req.params.songId, 10);
    const id = parseInt(req.params.id, 10);
    try {
        await prisma.$transaction(async (tx) => {
            await tx.playlist.update({
                where: { id: id },
                data: {
                    songs: {
                        disconnect: { id: songId },
                    },
                },
            });

            const updated = await tx.playlist.findUnique({
                where: { id: id },
                include: { songs: true },
            });

            return tx.playlist.update({
                where: { id: id },
                data: { length: updated?.songs.reduce((sum, song) => sum + song.length, 0) || 0 },
            });
        })

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Playlist error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}