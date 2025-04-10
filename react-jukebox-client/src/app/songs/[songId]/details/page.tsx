"use client";

import { use, useState } from "react";
import { usePlaylist } from "@/app/context/PlaylistContext";
import testSongs from "@/app/testdata/testsongs";
import { Box, Button, Snackbar } from "@mui/material";

export default function Details({ params }: { params: Promise<{ songId: number }> }) {
  const { addToPlaylist, removeFromPlaylist } = usePlaylist();
  const { songId } = use(params);
  const song = testSongs.find(song => song.id === Number(songId))!;

  const [errorOpen, setErrorOpen] = useState(false);
  const [succesOpen, setSuccesOpen] = useState(false);

  const handleAdd = () => {
    const success = addToPlaylist(song);
    if (!success) {
      setErrorOpen(true);
    } else {
      setSuccesOpen(true)
    }
  };

  if (!song) {
    return <p>This song id does not exist.</p>;
  }

  return (
    <div>
      <Box>
        <h1>{song.name} details</h1>

        <Button onClick={handleAdd} variant="contained" color="primary">
          Add to Playlist
        </Button>

        <Button onClick={() => removeFromPlaylist(song)} variant="contained" color="secondary">
          Remove from Playlist
        </Button>

        <Snackbar
          open={succesOpen}
          onClose={() => setSuccesOpen(false)}
          autoHideDuration={2000}
          message="Nummer succesvol aan jouw playlist toegevoegd!"
        />

        <Snackbar
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          autoHideDuration={2000}
          message="Dit nummer staat al in jouw playlist!"
        />
      </Box>
    </div>
  );
}
