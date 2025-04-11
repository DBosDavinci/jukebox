import { Button, Input } from "@mui/material";
import Link from "next/link";

export default function Login() {
    return (
      <div className="login">
        <Input placeholder="username"/>
        <Input placeholder="password"/>
        <Button>login</Button>
        
        <p>no account? register here:</p>
        <Button component={Link} href="/register">Register</Button>
      </div>
    );
  }