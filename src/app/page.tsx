import Header from "@/components/layout/Header";
import HeroScrub from "@/components/sections/HeroScrub";
import ServicesReveal from "@/components/sections/ServicesReveal";
import SelectedWork from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <main className="w-full bg-black text-white selection:bg-white selection:text-black">
      {/* Floating Navigation */}
      <Header />

      {/* Hero Scroll Transition */}
      <HeroScrub />

      {/* What ADMAKI Builds: Immersive Capabilities Reveal */}
      <ServicesReveal />

      {/* Selected Work: Editorial Case Studies */}
      <SelectedWork />
    </main>
  );
}


