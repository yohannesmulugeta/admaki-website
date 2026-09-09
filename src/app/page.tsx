import HeroScrub from "@/components/sections/HeroScrub";

export default function Home() {
  return (
    <main className="w-full bg-black text-white">
      {/* Hero Scroll Transition */}
      <HeroScrub />

      {/* Next Section Placeholder (verifies natural scroll continuation) */}
      <section className="relative z-20 min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center px-6 py-24 text-center border-t border-zinc-800">
        <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
          Next Section
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-white">
          Digital Excellence Awaits
        </h2>
        <p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
          Smoothly transitioned from hero video scrub into the page flow.
        </p>
      </section>
    </main>
  );
}


