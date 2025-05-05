'use client';

import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { removeSongFromPlaylist } from "../functions/playlist";

export default function RemoveSongButton({ songId, playlistId }: { songId: number, playlistId: number }) {
  const handleRemove = async () => {
    const success = await removeSongFromPlaylist(playlistId, songId);
    if (success) {
      window.location.reload();
    } else {
      alert("Verwijderen mislukt.");
    }
  };

  return (
    <IconButton onClick={() => handleRemove()}><ClearIcon sx={{ color: "red" }} /></IconButton>
  );
}
