import Header from "@/components/layout/Header";
import HeroScrub from "@/components/sections/HeroScrub";
import ServicesReveal from "@/components/sections/ServicesReveal";

export default function Home() {
  return (
    <main className="w-full bg-black text-white selection:bg-white selection:text-black">
      {/* Floating Navigation */}
      <Header />

      {/* Hero Scroll Transition */}
      <HeroScrub />

      {/* What ADMAKI Builds: Immersive Capabilities Reveal */}
      <ServicesReveal />
    </main>
  );
}


