'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    Typography,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Song from '@/app/models/song';
import Genre from '@/app/models/genre';
import { updatePlaylist } from '@/app/functions/playlist';
import { useRouter } from 'next/navigation';

export default function SongsPopup({ playlistId, currentSongs }: { playlistId: number, currentSongs: Song[] }) {
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedSongIds, setSelectedSongIds] = useState<Set<number>>(new Set(currentSongs.map(song => song.id)));
    const router = useRouter()

    useEffect(() => {
        const fetchSongsAndGenres = async () => {
            const fetchedSongs = await fetch(`http://localhost:5000/api/songs`, { cache: 'no-store' });
            const fetchedGenres = await fetch(`http://localhost:5000/api/genres`, { cache: 'no-store' });
            setSongs(await fetchedSongs.json());
            setGenres(await fetchedGenres.json());
        };

        fetchSongsAndGenres();
    }, []);


    const handleToggle = (songId: number) => {
        setSelectedSongIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(songId)) {
                newSet.delete(songId);
            } else {
                newSet.add(songId);
            }
            return newSet;
        });
    };


    const getSongsByGenre = (genreId: number) => {
        return songs.filter(song => song.genreId === genreId);
    };

    const handleSave = async () => {
        try {
            const response = await updatePlaylist(playlistId, { songs: Array.from(selectedSongIds) })

            if (!response) {
                throw new Error("Failed to save songs.");
            }

            setOpen(false);
            router.refresh()
        } catch (error) {
            console.error("Error saving songs:", error);
            alert("Failed to save changes.");
        }
    };


    return (
        <>
            <Button onClick={() => setOpen(true)}>Add more songs</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <div style={{ padding: '20px' }}>
                    <Typography variant="h6">Select Songs by Genre</Typography>
                    {genres.map((genre) => (
                        <Accordion key={genre.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{genre.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {getSongsByGenre(genre.id).map((song) => (
                                    <FormControlLabel
                                        key={song.id}
                                        control={
                                            <Checkbox
                                                checked={selectedSongIds.has(song.id)}
                                                onChange={() => handleToggle(song.id)}
                                            />
                                        }
                                        label={song.name}
                                    />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Button onClick={() => setOpen(false)} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Dialog>

        </>
    );
}
