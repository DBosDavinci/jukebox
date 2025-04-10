import { Box, Button, List, ListItem } from "@mui/material";
import * as React from 'react';
import testSongs from "@/app/testdata/testsongs";
import Link from "next/link";

export default async function Genres({params,}:{params: Promise<{ genre: string }>}) {
    const {genre} = await params;

    return (
      <div className="genres">
        <Box>
          <h1>{genre}</h1>
          <List>
            {testSongs.map(song => {
              if (song.genre.toLowerCase() == genre) {
                return <ListItem key={song.name}>{song.name} <Button component={Link} href={`/songs/${song.id}/details`}>Details</Button></ListItem>
              }
            })}
          </List>
        </Box>
      </div>
    );
  }