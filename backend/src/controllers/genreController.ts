import { Request, Response } from "express";
import prisma from "../prisma/client";

export async function getAllGenres(req: Request, res: Response) {
  const genres = await prisma.genre.findMany();
  res.json(genres);
}

export async function getGenreById(req: Request, res: Response) {
  const genreId = parseInt(req.params.genreId, 10);
  const genre = await prisma.genre.findUnique({ where: { id: genreId } });
  res.json(genre);
}