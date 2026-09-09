import React from 'react';

interface ServiceVisualProps {
  index: number;
}

export default function ServiceVisual({ index }: ServiceVisualProps) {
  return (
    <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[560px] mx-auto flex items-center justify-center p-4 select-none pointer-events-none">
      {/* Ambient background glow matching the hero hyper-cube */}
      <div className="absolute inset-0 rounded-3xl bg-radial from-cyan-500/10 via-indigo-500/5 to-transparent blur-2xl" />

      {/* Outer framing container */}
      <div className="relative w-full h-full rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Visual 1: Social Media (Layered Content Frames & Vertical Media Geometry) */}
        {index === 0 && (
          <div className="relative w-full h-full p-8 flex items-center justify-center">
            {/* Background offset card */}
            <div className="absolute w-44 h-72 rounded-2xl border border-white/10 bg-zinc-900/40 -translate-x-8 -translate-y-6 rotate-[-6deg] shadow-2xl">
              <div className="p-3 border-b border-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Front vertical frame (9:16 aspect ratio) */}
            <div className="relative w-48 h-80 rounded-2xl border border-white/20 bg-gradient-to-b from-zinc-900/80 via-black to-zinc-950 p-4 shadow-2xl flex flex-col justify-between">
              {/* Top bar / status */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-400 tracking-wider">LIVE FEED</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500">9:16</span>
              </div>

              {/* Center media preview area */}
              <div className="my-auto relative w-full h-36 rounded-lg border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-radial from-violet-500/20 via-transparent to-transparent" />
                {/* Audio waveform / kinetic graphic */}
                <div className="flex items-center gap-1 h-12">
                  <span className="w-1 h-6 bg-cyan-400/80 rounded-full animate-pulse" />
                  <span className="w-1 h-10 bg-indigo-400/80 rounded-full" />
                  <span className="w-1 h-8 bg-white/80 rounded-full" />
                  <span className="w-1 h-12 bg-cyan-400 rounded-full" />
                  <span className="w-1 h-7 bg-indigo-400/80 rounded-full" />
                  <span className="w-1 h-4 bg-cyan-400/60 rounded-full" />
                </div>
                <span className="mt-2 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  Brand Campaign
                </span>
              </div>

              {/* Bottom engagement metrics bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">+340%</span>
                  <span className="text-zinc-500">Reach</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[8px]">
                  VIRAL
                </span>
              </div>
            </div>

            {/* Third floating pill widget */}
            <div className="absolute right-10 bottom-12 px-3.5 py-2 rounded-full border border-cyan-400/30 bg-black/80 backdrop-blur-md flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-mono text-zinc-300 tracking-wider uppercase">
                Content Matrix
              </span>
            </div>
          </div>
        )}

        {/* Visual 2: Web Development (Browser Interface Geometry & Modular Architecture) */}
        {index === 1 && (
          <div className="relative w-full h-full p-8 flex flex-col justify-center gap-4">
            {/* Browser Header Bar */}
            <div className="w-full rounded-xl border border-white/15 bg-zinc-900/60 p-3 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 border border-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 border border-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 border border-emerald-500" />
                <span className="ml-2 text-[10px] font-mono text-zinc-400">admaki.dev/runtime</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                120 FPS
              </span>
            </div>

            {/* Split viewport wireframe */}
            <div className="grid grid-cols-12 gap-3 h-56">
              {/* Left wireframe column */}
              <div className="col-span-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2 w-16 bg-white/20 rounded" />
                  <div className="h-1.5 w-12 bg-white/10 rounded" />
                  <div className="h-1.5 w-20 bg-white/10 rounded" />
                </div>
                <div className="p-2 rounded border border-cyan-500/20 bg-cyan-500/5 text-[9px] font-mono text-cyan-300">
                  &lt;Canvas /&gt;
                </div>
              </div>

              {/* Right main interactive viewport */}
              <div className="col-span-8 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-black p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-cyan-500/10 blur-xl" />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                    Interactive Viewport
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Next.js Turbopack</span>
                </div>

                {/* Perspective layout grids */}
                <div className="relative h-24 border border-dashed border-white/15 rounded flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <div className="text-xs font-mono font-semibold text-white tracking-widest">
                      WebGL &amp; App Router
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500">
                      Ultra-Responsive Architecture
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                  <span>99.9% Lighthouse</span>
                  <span className="text-emerald-400">Optimized</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual 3: Custom Software (Data System Architecture & Workflow Matrix) */}
        {index === 2 && (
          <div className="relative w-full h-full p-8 flex flex-col justify-center gap-4">
            {/* Top telemetry status */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-zinc-300 font-semibold tracking-wider">ERP CORE ENGINE</span>
              </div>
              <span className="text-[10px] text-zinc-500">v4.2 // CLUSTER 01</span>
            </div>

            {/* Modular node pipeline */}
            <div className="space-y-3">
              {/* Node 1 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold">
                    01
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Data Ingestion Engine</div>
                    <div className="text-[9px] font-mono text-zinc-500">Real-time Kafka / WebSockets</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
              </div>

              {/* Connecting pipe */}
              <div className="w-0.5 h-3 bg-indigo-500/40 ml-7" />

              {/* Node 2 */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-xs font-mono text-cyan-400 font-bold">
                    02
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Business Logic &amp; State</div>
                    <div className="text-[9px] font-mono text-zinc-500">PostgreSQL / Redis Cache</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">SYNCED</span>
              </div>

              {/* Node 3 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-xs font-mono text-emerald-400 font-bold">
                    03
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Executive Dashboard</div>
                    <div className="text-[9px] font-mono text-zinc-500">Role-Based Access Control</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">READY</span>
              </div>
            </div>

            {/* Bottom latency benchmark */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
              <span>Throughput: 14.8k req/s</span>
              <span className="text-indigo-400">Latency: 12ms</span>
            </div>
          </div>
        )}

        {/* Visual 4: Automation (Connected Telegram Nodes & Event Bus Flow) */}
        {index === 3 && (
          <div className="relative w-full h-full p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-white font-semibold tracking-wider">
                  TELEGRAM BOT &amp; AGENT BUS
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                24/7 DAEMON
              </span>
            </div>

            {/* Flow Graph */}
            <div className="relative my-auto flex flex-col items-center justify-center py-4">
              {/* Central Broker Hub */}
              <div className="relative z-10 w-44 p-3 rounded-xl border border-cyan-400/40 bg-zinc-950 shadow-[0_0_30px_rgba(6,182,212,0.2)] text-center">
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  Telegram Bot API
                </div>
                <div className="text-[9px] font-mono text-zinc-400 mt-0.5">
                  Webhook Event Dispatcher
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-white/20" />

              {/* Branching Nodes */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-3 rounded-lg border border-white/10 bg-white/[0.03] text-center space-y-1">
                  <div className="text-[10px] font-mono text-white font-medium">AI Workflow Handler</div>
                  <div className="text-[8px] font-mono text-emerald-400">Auto-Responses</div>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-white/[0.03] text-center space-y-1">
                  <div className="text-[10px] font-mono text-white font-medium">Payment &amp; CRM Hook</div>
                  <div className="text-[8px] font-mono text-indigo-400">Instant Sync</div>
                </div>
              </div>
            </div>

            {/* Terminal activity log */}
            <div className="rounded-lg border border-white/10 bg-black/80 p-3 font-mono text-[9px] text-zinc-400 space-y-1">
              <div className="flex items-center justify-between text-zinc-500">
                <span>EVENT STREAM</span>
                <span className="text-emerald-400">LIVE</span>
              </div>
              <div className="text-zinc-300">
                <span className="text-cyan-400">&gt;</span> [TG_BOT] Message received: /start order_782
              </div>
              <div className="text-zinc-400">
                <span className="text-emerald-400">&gt;</span> [DISPATCH] Automated payload sent in 48ms
              </div>
            </div>
          </div>
        )}

        {/* Framing corner accents */}
        <div className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">[+]</div>
        <div className="absolute top-2 right-2 text-white/20 font-mono text-[9px]">[+]</div>
        <div className="absolute bottom-2 left-2 text-white/20 font-mono text-[9px]">[+]</div>
        <div className="absolute bottom-2 right-2 text-white/20 font-mono text-[9px]">[+]</div>
      </div>
    </div>
  );
}
