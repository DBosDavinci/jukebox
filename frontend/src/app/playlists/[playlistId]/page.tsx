import { Box, Button, List, ListItem } from "@mui/material";
import * as React from 'react';
import Link from "next/link";
import { getPlaylistsById } from "@/app/functions/playlist";
import Playlist from "../../models/playlist";
import SecondsToMinutes from "@/app/functions/SecondsToMinutes";
import RemoveSongButton from "@/app/playlists/[playlistId]/RemoveSongButton";
import SongsPopup from "./SongsPopup";

export default async function PlaylistSpecific({ params, }: { params: Promise<{ playlistId: number }> }) {
  const { playlistId } = await params;
  const playlist = await getPlaylistsById(playlistId) as Playlist

  return (
    <div className="playlists">
      <Box>
        <h1>Naam: {playlist.name}</h1> <Button component={Link} href={`/playlists/${playlistId}/changename`}>Change</Button>
        <h1>Totale duur: {SecondsToMinutes(playlist.length)}</h1>
        <List>
          {playlist.songs?.map(song => {
            return <ListItem key={song.name}>
              {song.name}
              <Button component={Link} href={`/songs/${song.id}`}>Details</Button>
              <RemoveSongButton playlistId={playlist.id} songId={song.id} />
            </ListItem>
          })}
        </List>
        <SongsPopup playlistId={playlist.id} currentSongs={playlist.songs} />
      </Box>
    </div>
  );
}