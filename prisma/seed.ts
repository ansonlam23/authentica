import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const places = [
    {
      name: "Brewed Awakening",
      category: "Coffee Shop",
      description:
        "Artisan coffee with locally roasted beans and a cozy atmosphere.",
      imageUrl: "/images/coffee.jpg",
      rating: 4.5,
    },
    {
      name: "Sakura Sushi",
      category: "Restaurant",
      description: "Authentic Japanese sushi with fresh daily catches.",
      imageUrl: "/images/sushi.jpg",
      rating: 4.2,
    },
    {
      name: "The Reading Nook",
      category: "Bookstore Cafe",
      description:
        "Books, pastries, and pour-over coffee in a quiet setting.",
      imageUrl: "/images/bookstore.jpg",
      rating: 4.7,
    },
    {
      name: "Slice of Heaven",
      category: "Pizza",
      description: "Wood-fired Neapolitan pizza with homemade dough.",
      imageUrl: "/images/pizza.jpg",
      rating: 4.3,
    },
    {
      name: "Tropical Blendz",
      category: "Smoothie Bar",
      description:
        "Fresh fruit smoothies, acai bowls, and cold-pressed juices.",
      imageUrl: "/images/smoothie.jpg",
      rating: 4.6,
    },
  ];

  for (const place of places) {
    await prisma.place.create({ data: place });
  }

  console.log("Seeded 5 places");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
