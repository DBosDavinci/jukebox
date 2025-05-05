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

export default function SongsPopup({ currentSongs }: { currentSongs: Song[] }) {
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedSongIds, setSelectedSongIds] = useState<Set<number>>(new Set(currentSongs.map(song => song.id)));

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
                </div>
            </Dialog>
        </>
    );
}
