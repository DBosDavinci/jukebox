import { Box, Button, List, ListItem } from "@mui/material";
import * as React from 'react';
import Link from "next/link";
import { getGenreById } from "@/app/functions/genres";
import { getSongsByGenre } from "@/app/functions/songs";

export default async function Genres({params,}:{params: Promise<{ genreId: number }>}) {
    const {genreId} = await params;
    const genre = await getGenreById(genreId)
    const songs = await getSongsByGenre(genreId)

    return (
      <div className="genres">
        <Box>
          <h1>{genre.name}</h1>
          <List>
            {songs.map(song => {
              return <ListItem key={song.name}>{song.name} <Button component={Link} href={`/songs/${song.id}/details`}>Details</Button></ListItem>
            })}
          </List>
        </Box>
      </div>
    );
  }