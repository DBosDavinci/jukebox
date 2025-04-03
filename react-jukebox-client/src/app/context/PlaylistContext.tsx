"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import Song from "../models/song";

interface PlaylistContextType {
  playlist: Song[];
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (song: Song) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const addToPlaylist = (song: Song) => {
    setPlaylist((prev) => [...prev, song]);
  };

  const removeFromPlaylist = (song: Song) => {
    setPlaylist((prev) => prev.filter((item) => item !== song));
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist(): PlaylistContextType {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}
