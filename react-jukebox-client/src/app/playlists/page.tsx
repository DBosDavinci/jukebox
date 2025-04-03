"use client"
import { usePlaylist } from "../context/PlaylistContext";

export default function Playlists() {
    const { playlist } = usePlaylist();

    return (
      <div className="playlists">
        <h1>Your Playlist:</h1>
        <ul>
          {playlist.length === 0 ? <p>No songs added yet.</p> : playlist.map((song, index) => (
            <li key={index}>{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  