import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { PlaylistProvider } from "./context/PlaylistContext";

export const metadata: Metadata = {
  title: "React jukebox",
  description: "react jukebox gemaakt door daniel bos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <PlaylistProvider>
          {children}
        </PlaylistProvider>
      </body>
    </html>
  );
}
