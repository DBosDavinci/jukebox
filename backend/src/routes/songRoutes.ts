import { Router } from "express";
import { getAllSongs, getSongById, getSongsByGenre } from "../controllers/songController";

const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.get("/genre/:genreId", getSongsByGenre);

export default router;