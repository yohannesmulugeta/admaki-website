import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 selection:bg-white selection:text-black">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-md text-center">
        {/* Monospace Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono tracking-widest text-cyan-400 uppercase mb-8">
          <span>STATUS 404 // NOT FOUND</span>
        </div>

        {/* Large Typography Header */}
        <h1 className="text-6xl sm:text-8xl font-mono font-black tracking-tight text-white mb-4">
          404
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-8">
          The requested coordinate or case study does not exist in this deployment matrix.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            ← Return to Studio
          </Link>
          <Link
            href="/#work"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-all"
          >
            Explore Work
          </Link>
        </div>
      </div>
    </div>
  );
}
