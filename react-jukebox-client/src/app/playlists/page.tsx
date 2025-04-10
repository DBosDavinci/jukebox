"use client"
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { usePlaylist } from "../context/PlaylistContext";
import Link from "next/link";

export default function Playlists() {
    const { playlist, removeFromPlaylist } = usePlaylist();

    return (
      <div className="playlists">
        <h1>Your Playlist:</h1>
        <ul>
          {playlist.length === 0 ? <p>No songs added yet.</p> : playlist.map((song, index) => (
            <li key={index}>{song.name} 
              <IconButton onClick={() => removeFromPlaylist(song)}><ClearIcon sx={{color:"red"}}/></IconButton>
              <IconButton component={Link} href={`/songs/${song.id}/details`}><InfoIcon sx={{color:"white"}}/></IconButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  