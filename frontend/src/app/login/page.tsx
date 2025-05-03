'use client';

import { Button, Input } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      window.location.href = "/";
    } else {
      alert("Foute login");
    }
  };

  return (
    <div className="login">
      <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>login</Button>
    </div>
  );
}
