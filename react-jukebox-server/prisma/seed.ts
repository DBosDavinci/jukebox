import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.song.createMany({
    data: [
      { name: "Bohemian Rhapsody", genre: "Rock", length: 354 },
      { name: "Blinding Lights", genre: "Pop", length: 200 },
      { name: "Take Five", genre: "Jazz", length: 324 },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
