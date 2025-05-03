import { Request, Response } from "express";
import prisma from "../prisma/client";

export async function getAllSongs(req: Request, res: Response) {
  const songs = await prisma.song.findMany();
  res.json(songs);
}

export async function getSongById(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const song = await prisma.song.findUnique({ where: { id } });
  res.json(song);
}

export async function getSongsByGenre(req: Request, res: Response) {
  const genreId = parseInt(req.params.genreId, 10);
  const songs = await prisma.song.findMany({ where: { genreId } });
  res.json(songs);
}