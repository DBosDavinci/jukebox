import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.playlist.deleteMany();
  await prisma.song.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();
}

main()
  .catch((e) => {
    console.error("error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
