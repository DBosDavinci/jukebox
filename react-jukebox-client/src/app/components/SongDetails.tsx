"use client"

import * as React from 'react';
import {Dialog, Button} from '@mui/material';
import Song from '../models/song';

export interface SongDetailsProps {
    open: boolean;
    song: Song;
    onClose: (value: string) => void;
}

export function SongDetails(props: SongDetailsProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose("test");
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Button onClick={handleClose}></Button>
        </Dialog>
    );
}