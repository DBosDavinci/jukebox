import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { PlaylistProvider } from "./context/PlaylistContext";
import SessionProviderWrapper from "./SessionProviderWrapper";

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
        <SessionProviderWrapper>
          <Navbar />
          <PlaylistProvider>
            {children}
          </PlaylistProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
