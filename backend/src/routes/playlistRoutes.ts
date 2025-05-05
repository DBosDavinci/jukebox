import { Router } from "express";
import { createPlaylist, getPlaylistById, getPlaylistByUser, removeSongFromPlaylist, updatePlaylistName } from "../controllers/playlistController";

const router = Router();

router.get("/:id", getPlaylistById);
router.get("/user/:userId", getPlaylistByUser);
router.post("/", createPlaylist);
router.put("/:id", updatePlaylistName)
router.delete("/:id/:songId", removeSongFromPlaylist);

export default router;