import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    // Range seed Data
    const range1 = await prisma.range.upsert({
      where: { name: 'Short Range (Up to 2000 Nautical Miles)' },
      update: { name: 'Short Range (Up to 2000 Nautical Miles)' },
      create: { name: 'Short Range (Up to 2000 Nautical Miles)' },
    });
    const range2 = await prisma.range.upsert({
      where: { name: 'Medium Range (2000-5000 Nautical Miles)' },
      update: { name: 'Medium Range (2000-5000 Nautical Miles)' },
      create: { name: 'Medium Range (2000-5000 Nautical Miles)' },
    });
    const range3 = await prisma.range.upsert({
      where: { name: 'Long Range (5000+ Nautical Miles)' },
      update: { name: 'Long Range (5000+ Nautical Miles)' },
      create: { name: 'Long Range (5000+ Nautical Miles)' },
    });

    console.log({ range1, range2, range3 });

    // Facility seed Data
    const facility1 = await prisma.facility.upsert({
      where: { name: 'Wi-Fi' },
      update: { name: 'Wi-Fi' },
      create: { name: 'Wi-Fi' },
    });
    const facility2 = await prisma.facility.upsert({
      where: { name: 'Entertainment Systems' },
      update: { name: 'Entertainment Systems' },
      create: { name: 'Entertainment Systems' },
    });
    const facility3 = await prisma.facility.upsert({
      where: { name: 'Catering' },
      update: { name: 'Catering' },
      create: { name: 'Catering' },
    });
    const facility4 = await prisma.facility.upsert({
      where: { name: 'Conference Facilties' },
      update: { name: 'Conference Facilties' },
      create: { name: 'Conference Facilties' },
    });
    const facility5 = await prisma.facility.upsert({
      where: { name: 'Pet Friendly' },
      update: { name: 'Pet Friendly' },
      create: { name: 'Pet Friendly' },
    });

    console.log({ facility1, facility2, facility3, facility4, facility5 });
    // Capacity seed Data
    const capacity1 = await prisma.capacity.upsert({
      where: { name: 'Small jet (Up to 6 passengers)' },
      update: { name: 'Small jet (Up to 6 passengers)' },
      create: { name: 'Small jet (Up to 6 passengers)' },
    });
    const capacity2 = await prisma.capacity.upsert({
      where: { name: 'Midsize jet (7-10 passengers)' },
      update: { name: 'Midsize jet (7-10 passengers)' },
      create: { name: 'Midsize jet (7-10 passengers)' },
    });
    const capacity3 = await prisma.capacity.upsert({
      where: { name: 'Large Jet (11-19 passengers)' },
      update: { name: 'Large Jet (11-19 passengers)' },
      create: { name: 'Large Jet (11-19 passengers)' },
    });

    console.log({ capacity1, capacity2, capacity3 });
  } catch (error) {
    console.log(error);
  }
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
