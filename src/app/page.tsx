import Header from "@/components/layout/Header";
import HeroScrub from "@/components/sections/HeroScrub";
import ServicesReveal from "@/components/sections/ServicesReveal";
import SelectedWork from "@/components/sections/SelectedWork";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="main-content" className="w-full bg-black text-white selection:bg-white selection:text-black">
      {/* Floating Navigation */}
      <Header />

      {/* Hero Scroll Transition */}
      <HeroScrub />

      {/* What ADMAKI Builds: Immersive Capabilities Reveal */}
      <ServicesReveal />

      {/* Selected Work: Editorial Case Studies */}
      <SelectedWork />

      {/* About ADMAKI: Creative Thinking. Technical Execution. */}
      <About />

      {/* Process: From Problem To Product */}
      <Process />

      {/* Contact: Let's Build Something Useful */}
      <Contact />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}


