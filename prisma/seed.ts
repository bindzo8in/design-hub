import { PrismaClient, Prisma, Role } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

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
  // Clear existing records
  await prisma.testimonial.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Admin User
  for (const u of userData) {
    if (!u.password) continue;
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword,
      },
    });
  }
  console.log("Admin user seeded successfully.");

  // Seed Categories
  const webDev = await prisma.category.create({
    data: { name: "Web Development", slug: "web-development" },
  });
  const mobileApps = await prisma.category.create({
    data: { name: "Mobile Apps", slug: "mobile-apps" },
  });
  const brandIdentity = await prisma.category.create({
    data: { name: "Brand Identity", slug: "brand-identity" },
  });
  console.log("Categories seeded successfully.");

  // Seed Clients
  const vortexClient = await prisma.client.create({
    data: { name: "Vortex Fintech Solutions", website: "https://vortex.designhub.com" },
  });
  const aetherClient = await prisma.client.create({
    data: { name: "Aether Smart-Home Ltd", website: "https://aether.designhub.com" },
  });
  const hyperionClient = await prisma.client.create({
    data: { name: "Hyperion Retail", website: "https://hyperion.designhub.com" },
  });
  console.log("Clients seeded successfully.");

  // Seed Projects
  await prisma.project.create({
    data: {
      title: "Vortex Web Platform",
      description: "A dark glassmorphic fintech dashboard designed for real-time digital transaction monitoring and automated liquidity processing.",
      clientName: "Vortex Fintech Solutions",
      budget: 120000,
      status: "IN_PROGRESS",
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-08-31"),
      categoryId: webDev.id,
      clientId: vortexClient.id,
    },
  });

  await prisma.project.create({
    data: {
      title: "Aether Control App",
      description: "A luxury dark-theme smart home command app featuring temperature controllers, automated security triggers, and lighting adjustments.",
      clientName: "Aether Smart-Home Ltd",
      budget: 85000,
      status: "COMPLETED",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2025-12-15"),
      categoryId: mobileApps.id,
      clientId: aetherClient.id,
    },
  });

  await prisma.project.create({
    data: {
      title: "Immersive Retail Storefront",
      description: "A cinematic immersive e-commerce experience crafted for global scale, featuring smooth 3D product previews and optimized checkout layouts.",
      clientName: "Hyperion Retail",
      budget: 45000,
      status: "PLANNING",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-10-31"),
      categoryId: brandIdentity.id,
      clientId: hyperionClient.id,
    },
  });

  // Seed Testimonials
  await prisma.testimonial.create({
    data: {
      author: "Anand Kumar",
      role: "CEO, Tech Startup",
      text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Design Hub made our vision a reality.",
    },
  });

  await prisma.testimonial.create({
    data: {
      author: "Priya Sharma",
      role: "Marketing Director, Organic Foods Corp",
      text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Our brand has never looked better.",
    },
  });
  console.log("Testimonials seeded successfully.");

  console.log("Database seeded successfully with encrypted credentials and mock portfolio assets.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });