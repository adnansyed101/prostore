import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  // Delete all existing products
  await prisma.product.deleteMany();
  // Delete all existing users
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully.");
}

main();
