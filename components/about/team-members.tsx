import FamilySection from "@/components/about/family-section";

const members = [
  {
    name: "Balaji",
    role: "Founder",
    image: "/team/balaji.png",
  },
  {
    name: "Manikandan R",
    role: "Graphic Designer",
    image: "/team/mani.png",
  },
  {
    name: "Ranjani Rajkumar",
    role: "UI/UX Designer",
    image: "/team/ranjani.png",
  },
];

const AboutFamilySection = () => {
  return (
    <FamilySection
      members={members}
      bottomContent="Design Hub is a creative agency specializing in branding, graphic design, website development, UI/UX, and digital marketing solutions. We help businesses transform ideas into powerful visuals and smart digital experiences. With a focus on creativity, quality, and timely delivery, our team works closely with clients to build brands that stand out and grow. At Design Hub, we blend design and strategy to create meaningful results for every project."
    />
  );
};

export default AboutFamilySection;