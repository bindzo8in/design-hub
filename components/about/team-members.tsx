import FamilySection from "@/components/about/family-section";
import { prisma } from "@/lib/prisma";

export default async function AboutFamilySection() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      name: true,
      role: true,
      imageUrl: true,
    },
  });

  const members = teamMembers.map((member) => ({
    name: member.name,
    role: member.role,
    image: member.imageUrl || "/logo/dark.png",
  }));

  return (
    <FamilySection
      members={members}
      bottomContent="Design Hub is a creative agency specializing in branding, graphic design, website development, UI/UX, and digital marketing solutions. We help businesses transform ideas into powerful visuals and smart digital experiences. With a focus on creativity, quality, and timely delivery, our team works closely with clients to build brands that stand out and grow. At Design Hub, we blend design and strategy to create meaningful results for every project."
    />
  );
}