import { SongDetails } from "@/app/components/SongDetails";
import { getSongById } from "@/app/functions/songs";

export default async function Details({ params }: { params: Promise<{ songId: number }> }) {
  const songId = (await params).songId;
  const song = await getSongById(songId)

  return <SongDetails song={song}/>;
}
