"use client"

import { usePlaylist } from "@/app/context/PlaylistContext";
import Song from "@/app/models/song";
import { Box, Button } from "@mui/material";
import * as React from 'react';

export default function Details({ params }: { params: {song: Song} }) {
    const { addToPlaylist, removeFromPlaylist } = usePlaylist();
    const {song} = params;

    return (
      <div>
        <Box>
          <h1>{song?.name} details</h1>

          <Button onClick={() => addToPlaylist(song)}>
            add to playlist
          </Button>

          <Button onClick={() => removeFromPlaylist(song)}>
            remove from playlist
          </Button>
        </Box>
      </div>
    );
  }