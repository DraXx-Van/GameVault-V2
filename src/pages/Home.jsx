import DiscoverSection from "../components/discover/DiscoverSection";
import Hero from "../components/hero/Hero";
import MainLayout from "../components/layout/MainLayout";
import VaultSection from "../components/vaultsection/VaultSection";

export default function Home() {
  return (
    <MainLayout>
      <Hero/>
      <DiscoverSection />
      <VaultSection />
    </MainLayout>
  );
}