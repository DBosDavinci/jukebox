"use client"
import { Button, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { usePlaylist } from "../context/PlaylistContext";
import Link from "next/link";

export default function Playlists() {
    const { playlist, removeFromPlaylist } = usePlaylist();

    return (
      <div className="playlists">
        <h1>Jouw playlist:</h1>
        <ul>
          {playlist.length === 0 ? <p>Nog geen nummers toegevoegd.</p> : playlist.map((song, index) => (
            <li key={index}>{song.name} 
              <IconButton onClick={() => removeFromPlaylist(song)}><ClearIcon sx={{color:"red"}}/></IconButton>
              <IconButton component={Link} href={`/songs/${song.id}/details`}><InfoIcon sx={{color:"white"}}/></IconButton>
            </li>
          ))}
          <Button component={Link} href="/playlists/create">Opslaan</Button>
        </ul>
      </div>
    );
  }
  