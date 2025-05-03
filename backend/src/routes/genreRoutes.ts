import { Router } from "express";
import { getAllGenres, getGenreById } from "../controllers/genreController";

const router = Router();

router.get("/", getAllGenres);
router.get("/:genreId", getGenreById);

export default router;