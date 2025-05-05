"use server"

import axios from "axios";

export async function register(username: string, password: string) {
    try {
        const res = await axios.post("http://backend:5000/api/auth/register", {
            username,
            password,
        });
        console.log(res)

        if (res.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (err: unknown) {
        console.log(err);
    }
}