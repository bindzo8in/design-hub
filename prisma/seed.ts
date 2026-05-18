import { PrismaClient, Prisma, Role } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const adminUsername = process.env.ADMIN_USERNAME!;
const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASSWORD!;

const userData: Prisma.UserCreateInput[] = [
  {
    name: adminUsername,
    email: adminEmail,
    password: adminPassword,
    role: Role.ADMIN,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();