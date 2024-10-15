import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// run once on a new database (make sure to comment out after running)

const seasonData: Prisma.SeasonCreateInput[] = [
  // {
  //   name: '2023',
  //   startDate: new Date('2023-02-5'),
  //   endDate: new Date('2023-03-22'),
  //   status: 'INACTIVE',
  // },
  // {
  //   name: '2024',
  //   startDate: new Date('2024-02-5'),
  //   endDate: new Date('2024-03-22'),
  //   status: 'ACTIVE',
  // },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const s of seasonData) {
    const season = await prisma.season.create({
      data: s,
    });
    console.log(`Created season with id: ${season.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
