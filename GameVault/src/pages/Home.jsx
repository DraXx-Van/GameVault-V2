import DiscoverSection from "../components/discover/DiscoverSection";
import Hero from "../components/hero/Hero";
import MainLayout from "../components/layout/MainLayout";
import BrowseCategoriesSection from "../components/home/BrowseCategoriesSection";

export default function Home() {
  return (
    <MainLayout>
      <Hero/>
      <DiscoverSection />
      <BrowseCategoriesSection />
    </MainLayout>
  );
}