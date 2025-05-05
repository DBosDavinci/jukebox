"use client"

import { Button, Input, IconButton, List, ListItem } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import { createPlaylist } from "../../functions/playlist";
import Link from "next/link";
import SecondsToMinutes from "@/app/functions/SecondsToMinutes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePlaylist() {
  const { playlist, removeFromPlaylist } = usePlaylist();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Kan playlist niet zonder naam opslaan.");
      return;
    }

    if (!playlist) {
      alert("Kan playlist niet zonder muziek opslaan.");
      return;
    }

    const result = await createPlaylist(name, playlist);
    if (result) {
      router.push('/playlists');
    } else {
      alert("Er is iets misgegaan bij het opslaan.");
    }
  };

  return (
    <div className="playlists">
      <h1>Jouw playlist:</h1>
      <List>
        {playlist.length === 0 ? <p>Nog geen nummers toegevoegd.</p> : playlist.map((song, index) => (
          <ListItem key={index}>{song.name}
            <IconButton onClick={() => removeFromPlaylist(song)}><ClearIcon sx={{ color: "red" }} /></IconButton>
            <IconButton component={Link} href={`/songs/${song.id}`}><InfoIcon sx={{ color: "white" }} /></IconButton>
          </ListItem>
        ))}
      </List>
      <h1>Totale duur: {SecondsToMinutes(playlist.reduce((total, song) => total + song.length, 0))}</h1>
      {session?.user &&
        <div>
          <h1>Geef jouw playlist een naam:</h1>
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naam van je playlist"
            />
            <Button onClick={handleSave}>Opslaan</Button>
          </div>
        </div>
      }
    </div>
  );
}
