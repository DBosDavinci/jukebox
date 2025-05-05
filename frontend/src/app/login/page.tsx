'use client';

import { Button, Input } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Foute login");
    }
  };

  return (
    <div className="login">
      <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>login</Button>
      <Button component={Link} href='/register'>Geen account? Registreer hier</Button>
    </div>
  );
}
