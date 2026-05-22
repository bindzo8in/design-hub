import HeroSection from "@/components/services/common/hero-section";
import DesignWorkSection from "@/components/services/packing-design/design-work-section";
import PackagingFeatureStrip from "@/components/services/packing-design/feature";
import PickSection from "@/components/services/packing-design/pick-section";
import ProductSection from "@/components/services/packing-design/product-section";
import ProductImages from "@/components/services/packing-design/ProductImage";

const Page = () => {
  return (
    <main>
      <HeroSection
        title="PACKING DESIGN"
        heading="Where Packaging Meets Purpose"
        description="We Design Packaging That Speaks Before The Product Does."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <ProductSection />
      {/* <ProductImages /> */}
      <DesignWorkSection />
      <PickSection />
      <PackagingFeatureStrip />
    </main>
  );
};

export default Page;
