import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.genre.createMany({
    data: [
      { name: "Pop" },
      { name: "Rock" },
      { name: "Electronic" },
      { name: "Country" },
      { name: "Jazz" }
    ],
    skipDuplicates: true,
  });

  await prisma.song.createMany({
    data: [
      { id: 1, name: "Blinding Lights", genreId: 1, length: 200 },
      { id: 2, name: "Levitating", genreId: 1, length: 203 },
      { id: 3, name: "As It Was", genreId: 1, length: 167 },
      { id: 4, name: "Smells Like Teen Spirit", genreId: 2, length: 301 },
      { id: 5, name: "Bohemian Rhapsody", genreId: 2, length: 354 },
      { id: 6, name: "Strobe", genreId: 3, length: 630 },
      { id: 7, name: "Titanium", genreId: 3, length: 245 },
      { id: 8, name: "Tennessee Whiskey", genreId: 4, length: 290 },
      { id: 9, name: "Take Me Home, Country Roads", genreId: 4, length: 191 },
      { id: 10, name: "Take Five", genreId: 5, length: 324 },
      { id: 11, name: "So What", genreId: 5, length: 545 },
      { id: 12, name: "Shivers", genreId: 1, length: 207 },
      { id: 13, name: "Hotel California", genreId: 2, length: 391 },
      { id: 14, name: "One More Time", genreId: 3, length: 320 },
      { id: 15, name: "Before He Cheats", genreId: 4, length: 230 }
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
