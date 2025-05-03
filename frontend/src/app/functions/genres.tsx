import { notFound } from "next/navigation";
import Genre from "../models/genre"

async function getGenres() {
    const response = await fetch(`http://backend:5000/api/genres`, { 
      cache: 'no-store' 
    })

    if (!response.ok) {
      notFound();
    }

    const genres: Genre[] = await response.json();
    return genres
  }

async function getGenreById(genreId: number) {
    const response = await fetch(`http://backend:5000/api/genres/${genreId}`, { 
      cache: 'no-store' 
    })

    if (!response.ok) {
      notFound();
    }

    const genre: Genre = await response.json();
    return genre
  }

export {getGenres, getGenreById}