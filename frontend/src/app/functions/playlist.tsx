"use server"

import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import axios from "axios";
import Song from "../models/song";

export async function getPlaylistsById(id: number) {

    const response = await axios.get(`http://backend:5000/api/playlist/${id}`)

    if (response.status == 200) {
        return response.data;
    } else {
        notFound()
    }
}

export async function getPlaylistsByUser(userId: number) {

    const response = await axios.get(`http://backend:5000/api/playlist/user/${userId}`)

    if (response.status == 200) {
        return response.data;
    } else {
        notFound()
    }
}

export async function createPlaylist(name: string, songs: Song[]) {
    const session = await getServerSession(authOptions);
    const length = songs.reduce((total, song) => total + song.length, 0);

    const response = await axios.post(`http://backend:5000/api/playlist`, {
        name: name,
        length: length,
        userId: session?.user.id,
        songs: songs
    })

    if (response.status == 201) {
        return true;
    } else {
        return false;
    }
}

export async function updatePlaylist(
    id: number,
    data: { name?: string; songs?: Song[] }
) {
    const response = await axios.put(`http://backend:5000/api/playlist/${id}`, data);

    return response.status === 200;
}

export async function removeSongFromPlaylist(playlistId: number, songId: number) {

    const response = await axios.delete(`http://backend:5000/api/playlist/${playlistId}/${songId}`)

    return response.status === 200;
}