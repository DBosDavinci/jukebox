import { Box, Button, List, ListItem } from "@mui/material";
import * as React from 'react';
import Link from "next/link";
import { getPlaylistsById } from "@/app/functions/playlist";
import Playlist from "../../models/playlist";

export default async function PlaylistSpecific({params,}:{params: Promise<{ playlistId: number }>}) {
    const {playlistId} = await params;
    const playlist = await getPlaylistsById(playlistId) as Playlist

    return (
      <div className="playlists">
        <Box>
          <h1>{playlist.name}</h1>
          <List>
            {playlist.songs?.map(song => {
              console.log(song)
              return <ListItem key={song.name}>{song.name} <Button component={Link} href={`/songs/${song.id}`}>Details</Button></ListItem>
            })}
          </List>
        </Box>
      </div>
    );
  }