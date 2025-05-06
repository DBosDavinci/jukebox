import { Router } from "express";
import { createPlaylist, getPlaylistById, getPlaylistByUser, removeSongFromPlaylist, updatePlaylist } from "../controllers/playlistController";

const router = Router();

router.get("/:id", getPlaylistById);
router.get("/user/:userId", getPlaylistByUser);
router.post("/", createPlaylist);
router.put("/:id", updatePlaylist)
router.delete("/:id/:songId", removeSongFromPlaylist);

export default router;