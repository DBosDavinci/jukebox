'use client';

import { Input, Button } from "@mui/material";
import * as React from 'react';
import { getPlaylistsById, updatePlaylist } from "@/app/functions/playlist";
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';

export default function RenamePlaylistPage() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();

    const playlistId = Number(params.playlistId);

    useEffect(() => {
        const fetchData = async () => {
            const playlist = await getPlaylistsById(playlistId);
            setName(playlist.name);
            setLoading(false);
        };

        fetchData();
    }, [playlistId]);

    const handleSave = async () => {
        await updatePlaylist(playlistId, { name });
        router.push(`/playlists/${playlistId}`);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="playlists">
            <h1>Nieuwe naam voor je playlist:</h1>
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Naam van je playlist"
            />
            <Button onClick={handleSave}>Opslaan</Button>
        </div>
    );
}
