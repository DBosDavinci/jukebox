"use server"

import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import axios from "axios";
import Song from "../models/song";

export async function createPlaylist(name: string, songs: Song[]) {
    const session = await getServerSession(authOptions);
    const totalLength = songs.reduce((total, song) => total + song.length, 0);

    const response = await axios.post(`http://backend:5000/api/playlist`, {
        name: name,
        length: totalLength,
        userId: session?.user.id,
        songs: songs
    })

    if (response.status == 200) {
        return true;
    } else {
        notFound()
    }
  }