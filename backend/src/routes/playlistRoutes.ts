import { Router } from "express";
import { createPlaylist, getPlaylistById, getPlaylistByUser } from "../controllers/playlistController";

const router = Router();

router.get("/:id", getPlaylistById);
router.get("/user/:userId", getPlaylistByUser);
router.post("/", createPlaylist);

export default router;