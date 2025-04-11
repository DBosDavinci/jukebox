import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.get("/api/songs", async (_req, res) => {
  const songs = await prisma.song.findMany();
  res.json(songs);
});

app.get("/api/genres", async (_req, res) => {
  const genres = await prisma.genre.findMany()
  res.json(genres);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
