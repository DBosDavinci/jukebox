"use client"
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import { createPlaylist } from "../../functions/playlist";

export default function CreatePlaylist() {
  const { playlist } = usePlaylist();
  const [name, setName] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Kan playlist niet zonder naam opslaan.");
      return;
    }
    await createPlaylist(name, playlist);
  };

  return (
    <div className="playlists">
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
  );
}
