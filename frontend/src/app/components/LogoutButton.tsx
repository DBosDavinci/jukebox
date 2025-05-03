'use client';

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: '/' })} color="inherit">
      Logout
    </Button>
  );
}
