import { notFound } from "next/navigation";
import Song from "../models/song";

async function getSongs() {
    const response = await fetch(`http://backend:5000/api/songs`, { 
      cache: 'no-store' 
    })

    if (!response.ok) {
      notFound();
    }

    const songs: Song[] = await response.json();
    return songs
  }

  async function getSongById(id: number) {
    const response = await fetch(`http://backend:5000/api/songs/${id}`, { 
      cache: 'no-store' 
    })

    if (!response.ok) {
      notFound();
    }

    const song: Song = await response.json();
    return song
  }

async function getSongsByGenre(genreId: number) {
    const response = await fetch(`http://backend:5000/api/songs/genre/${genreId}`, { 
      cache: 'no-store' 
    })

    if (!response.ok) {
      notFound();
    }

    const songs: Song[] = await response.json();
    return songs
  }

export {getSongs, getSongById, getSongsByGenre}