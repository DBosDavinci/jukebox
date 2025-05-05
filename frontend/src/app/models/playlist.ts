import Song from "./song.ts";

interface Playlist {
    id: number
    name: string
    songs: Song[]
    length: number
}

export default Playlist