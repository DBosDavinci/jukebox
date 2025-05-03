"use client"

import { useState } from "react";
import { usePlaylist } from "@/app/context/PlaylistContext";
import { Box, Button, Snackbar } from "@mui/material";
import SecondsToMinutes from "@/app/functions/SecondsToMinutes";
import Song from "../models/song";

interface SongDetailsProps {
    song: Song;
  }
  
export function SongDetails({ song }: SongDetailsProps) {
    const { addToPlaylist, removeFromPlaylist } = usePlaylist();
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
      <p>De lengte van dit nummer is: {SecondsToMinutes(song.length)}</p>

      <Button onClick={handleAdd} variant="contained" color="primary">
        Toevoegen aan playlist
      </Button>

      <Button onClick={() => removeFromPlaylist(song)} variant="contained" color="secondary">
        Verwijderen van playlist
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