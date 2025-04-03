import Song from "./song.ts";

interface Playlist {
    id: number
    name: string
    songs: Song[]
    totalLength: number
}

export default Playlist