import { Button, Input } from "@mui/material";
import Link from "next/link";

export default function Login() {
    return (
      <div className="register">
        <p>Register a new account</p>
        <Input placeholder="username"/>
        <Input placeholder="password"/>
        <Button component={Link} href="/register">Register</Button>
      </div>
    );
  }