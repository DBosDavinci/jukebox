import { Box, Button } from "@mui/material";
import * as React from 'react';

export default async function Genres({params,}:{params: Promise<{ genre: string }>}) {
    const {genre} = await params;

    return (
      <div className="genres">
        <Box>
          <h1>{genre}</h1>
          <Button href={`./${genre}/details`}>details</Button>
        </Box>
      </div>
    );
  }