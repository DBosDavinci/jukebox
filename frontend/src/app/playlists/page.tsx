import { getPlaylistsByUser } from "../functions/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Playlist from "../models/playlist";
import { Button, List, ListItem } from "@mui/material";
import Link from "next/link";

export default async function Playlists() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return (
      <div className="playlists">
        <p>Je moet ingelogd zijn om je playlists te zien.</p>
      </div>
    );
  }

  const playlists = await getPlaylistsByUser(session.user.id) as Playlist[];

  return (
    <div className="playlists">
      <h1>Jouw playlists:</h1>
      <List>
        {playlists.length === 0 ? <p>Nog geen playlists voor deze gebruiker.</p> : playlists.map((playlist, index) => (
          <ListItem key={index}>{playlist.name} <Button component={Link} href={`/playlists/${playlist.id}`}>Details</Button></ListItem>
        ))}
      </List>
    </div>
  );
}
  