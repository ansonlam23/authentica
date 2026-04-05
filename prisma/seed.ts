import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { LOCAL_BUSINESSES } from "../src/data/businesses";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.business.deleteMany();

  // Seed businesses
  for (let i = 0; i < LOCAL_BUSINESSES.length; i++) {
    const business = LOCAL_BUSINESSES[i];
    await prisma.business.create({
      data: {
        id: i + 1,
        ...business
      }
    });
  }

  console.log(`Seeded ${LOCAL_BUSINESSES.length} businesses`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });