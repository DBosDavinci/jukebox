'use client';

import img from "../images/Jukebox.png";
import * as React from 'react';
import "./Navbar.css";
import { Typography, Toolbar, Box, AppBar, Button } from '@mui/material';
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Image src={img} alt="" width={50} height={50} />
          <Box sx={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
            <Typography variant="h6" className="links">
              <Link href="/">Home</Link>
            </Typography>
            <Typography variant="h6" className="links">
              <Link href="/genres">Genres</Link>
            </Typography>
            <Typography variant="h6" className="links">
              <Link href="/playlists/create">Create playlist</Link>
            </Typography>
            {session?.user &&
              <Typography variant="h6" className="links">
                <Link href="/playlists">Playlists</Link>
              </Typography>
            }
          </Box>
          {session?.user ? (
            <>
              <Typography variant="h6" sx={{ marginRight: 2 }}>{session.user.name}</Typography>
              <Button onClick={() => signOut({ callbackUrl: '/' })} color="inherit">Logout</Button>
            </>
          ) : (
            <Button component={Link} href="/login" color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
