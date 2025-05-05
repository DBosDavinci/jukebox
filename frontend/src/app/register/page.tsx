'use client';

import { Button, Input } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../functions/auth";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        const status = await register(username, password)
        if (status) {
            const loginRes = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (loginRes?.ok) {
                router.push("/");
            }
        }
    };

    return (
        <div className="register">
            <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleRegister}>Registreer</Button>
            <Button component={Link} href='/login'>Al een account? Log hier in</Button>
        </div>
    );
}
