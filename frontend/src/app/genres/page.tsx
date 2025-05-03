import { Box, List, ListItem } from "@mui/material";
import "./genres.css";
import Link from "next/link";
import {getGenres} from "../functions/genres";

export default async function Genres() {
  const genres = await getGenres()

    return (
      <div className="genres">
        <Box>
          <h1>genres</h1>
          <List>
            {genres.map(genre => (
              <ListItem key={genre.name}><Link href={`/genres/${genre.id}`}>{genre.name}</Link></ListItem>
            ))}
          </List>
        </Box>
      </div>
    );
  }
  