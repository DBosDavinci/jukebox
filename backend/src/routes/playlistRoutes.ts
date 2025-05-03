import { Router } from "express";
import { createPlaylist } from "../controllers/playlistController";

const router = Router();

router.post("/", createPlaylist);

export default router;