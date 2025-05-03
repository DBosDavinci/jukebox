import img from "../images/Jukebox.png";
import * as React from 'react';
import "./Navbar.css";
import {Typography, Toolbar, Box, AppBar, Button} from '@mui/material';
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Image src={img} alt="" width={50} height={50}/>
          <Box sx={{ flexGrow : 1, flexDirection: "row", display: "flex" }}>
            <Typography variant="h6" className="links">
              <Link href="/">Home</Link>
            </Typography>
            <Typography variant="h6" className="links">
              <Link href="/genres">Genres</Link>
            </Typography>
            <Typography variant="h6" className="links">
              <Link href="/playlists">Playlists</Link>
            </Typography>
          </Box>
          {session?.user ?
            <h1>{session?.user.name}</h1> :
            <Button component={Link} href="/login" color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}