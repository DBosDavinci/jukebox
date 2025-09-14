"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Song from "../models/song";

interface PlaylistContextType {
  playlist: Song[];
  addToPlaylist: (song: Song) => boolean;
  removeFromPlaylist: (song: Song) => void;
  resetPlaylist: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("playlist");
    if (stored) {
      try {
        setPlaylist(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse playlist from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (song: Song): boolean => {
    const exists = playlist.some((s) => s.id === song.id);
    if (exists) {
      return false;
    }
    setPlaylist((prev) => [...prev, song]);
    return true;
  };

  const removeFromPlaylist = (song: Song) => {
    setPlaylist((prev) => prev.filter((item) => item !== song));
  };

  const resetPlaylist = () => {
    setPlaylist([])
  }

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist, resetPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist(): PlaylistContextType {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("only used in context");
  }
  return context;
}
