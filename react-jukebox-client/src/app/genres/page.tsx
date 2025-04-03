import { Box, List, ListItem } from "@mui/material";
import "./genres.css";
import Link from "next/link";

export default function Genres() {
    const genres = ["pop", "rock", "electronic", "country", "jazz"]

    return (
      <div className="genres">
        <Box>
          <h1>genres</h1>
          <List>
            {genres.map(genre => (
              <ListItem key={genre}><Link href={`/genres/${genre}`}>{genre}</Link></ListItem>
            ))}
          </List>
        </Box>
      </div>
    );
  }
  