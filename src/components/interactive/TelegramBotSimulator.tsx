'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  badge?: string;
  telemetry?: {
    latency: string;
    status: string;
    protocol: string;
  };
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: 'ADMAKI Automation Core online. Ready for command execution.',
    timestamp: 'Just now',
    badge: 'DAEMON READY',
    telemetry: {
      latency: '12ms',
      status: '200 OK',
      protocol: 'TLS 1.3 / FASTAPI',
    },
  },
  {
    id: 'msg-init-2',
    sender: 'bot',
    text: 'Select an automation workflow below to simulate live asynchronous dispatch:',
    timestamp: 'Just now',
  },
];

const commands = [
  { cmd: '/audit', label: 'System Audit', desc: 'Scan infrastructure' },
  { cmd: '/workflow', label: 'CRM Webhook', desc: 'Simulate dispatch' },
  { cmd: '/estimate', label: 'Scope Estimator', desc: 'Calculate timeline' },
  { cmd: '/status', label: 'Live Telemetry', desc: 'Server health' },
];

export default function TelegramBotSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const msgCounterRef = useRef(0);

  const handleCommand = (command: string) => {
    msgCounterRef.current += 1;
    const userMsgId = `usr-${msgCounterRef.current}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: command,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      msgCounterRef.current += 1;
      const botMsgId = `bot-${msgCounterRef.current}`;
      let botResponse: ChatMessage;

      if (command.toLowerCase().includes('/audit')) {
        botResponse = {
          id: botMsgId,
          sender: 'bot',
          text: '✓ System Security & Performance Audit Complete:\n\n• Next.js App Router: 100% Optimized\n• API Latency: 14ms (Edge CDN Active)\n• Database Pool: 100/100 Healthy\n• Webhook Failure Rate: 0.00%\n• Encryption: AES-256 / SHA-256 Webhook Signing',
          timestamp: 'Live',
          badge: 'AUDIT PASS',
          telemetry: {
            latency: '18ms',
            status: 'ALL SERVICES NOMINAL',
            protocol: 'HEALTH_CHECK_V2',
          },
        };
      } else if (command.toLowerCase().includes('/workflow')) {
        botResponse = {
          id: botMsgId,
          sender: 'bot',
          text: '⚡ Event Pipeline Dispatched:\n\n1. Inbound Telegram Webhook received\n2. Payload decrypted and validated\n3. Redis worker allocated (Worker #04)\n4. PostgreSQL record updated in 8ms\n5. Client push notification dispatched',
          timestamp: 'Live',
          badge: 'PIPELINE SYNC',
          telemetry: {
            latency: '24ms',
            status: 'QUEUE_CLEARED',
            protocol: 'ASYNC_FASTAPI',
          },
        };
      } else if (command.toLowerCase().includes('/estimate')) {
        botResponse = {
          id: botMsgId,
          sender: 'bot',
          text: '📊 Typical ADMAKI Execution Windows:\n\n• Telegram Bot & Automation: 1–3 weeks\n• Custom Interactive Website: 2–4 weeks\n• Custom ERP / Internal Tooling: 4–8 weeks\n• Full Social Creative System: 2–3 weeks',
          timestamp: 'Live',
          badge: 'TIMELINE MATRIX',
          telemetry: {
            latency: '11ms',
            status: 'CALC_COMPLETE',
            protocol: 'ESTIMATOR_V1',
          },
        };
      } else if (command.toLowerCase().includes('/status')) {
        botResponse = {
          id: botMsgId,
          sender: 'bot',
          text: '🟢 Live Telemetry Stream:\n\n• Daemon: Active (24/7 Autonomous)\n• Worker Concurrency: 16 processes\n• Memory Usage: 42MB / 512MB\n• Uptime: 99.99%\n• Active Handlers: 12 Webhook Routers',
          timestamp: 'Live',
          badge: 'CLUSTER OK',
          telemetry: {
            latency: '9ms',
            status: 'ONLINE',
            protocol: 'REDIS_TELEMETRY',
          },
        };
      } else {
        botResponse = {
          id: botMsgId,
          sender: 'bot',
          text: `Command received: "${command}". I am configured to execute custom automation routines. Click any command button below for pre-built simulations.`,
          timestamp: 'Live',
          badge: 'DISPATCH',
          telemetry: {
            latency: '16ms',
            status: 'ROUTED',
            protocol: 'DISPATCHER',
          },
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const cmd = inputValue;
    setInputValue('');
    handleCommand(cmd);
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setIsTyping(false);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-sans">
      {/* Header Bar */}
      <div className="px-5 py-4 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-400 font-mono font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span>A</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
                @ADMAKI_Bot
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono">
                DAEMON
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              Active 24/7 • Latency: 12ms
            </span>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white px-2.5 py-1 rounded border border-white/5 hover:border-white/20 transition-colors"
          title="Reset conversation"
        >
          Reset
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-5 space-y-4 max-h-[380px] min-h-[280px] overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,transparent_60%)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed transition-all ${
                msg.sender === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-400/30 text-white rounded-br-none shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  : 'bg-zinc-900/80 border border-white/10 text-zinc-200 rounded-bl-none shadow-lg'
              }`}
            >
              {msg.badge && (
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[9px] font-mono text-cyan-400 font-semibold tracking-wider">
                  <span>{msg.badge}</span>
                  <span className="text-zinc-400">{msg.timestamp}</span>
                </div>
              )}

              <div className="whitespace-pre-line font-mono text-xs sm:text-sm leading-relaxed">{msg.text}</div>

              {msg.telemetry && (
                <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap items-center gap-3 text-[9px] font-mono text-zinc-400">
                  <span>Latency: {msg.telemetry.latency}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{msg.telemetry.status}</span>
                </div>
              )}
            </div>

            <span className="text-[9px] font-mono text-zinc-400 px-1 mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ADMAKI Bot is processing payload...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Quick Command Buttons */}
      <div className="px-5 py-3 border-t border-white/10 bg-zinc-900/30 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mr-1 hidden sm:inline">
          Quick Commands:
        </span>
        {commands.map((c) => (
          <button
            key={c.cmd}
            type="button"
            onClick={() => handleCommand(c.cmd)}
            className="px-3.5 py-2 min-h-[40px] rounded-lg border border-white/10 bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-400/40 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95"
            aria-label={`Run command ${c.cmd}`}
          >
            <span className="text-cyan-400 font-bold">{c.cmd}</span>
            <span className="text-[10px] text-zinc-400 hidden md:inline">{c.desc}</span>
          </button>
        ))}
      </div>

      {/* Input Prompt Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2" aria-label="Simulated command entry">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a command (e.g. /workflow, /audit)..."
          aria-label="Command input for Telegram Bot simulation"
          className="flex-1 bg-zinc-900/70 border border-white/10 rounded-xl px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/60 focus-visible:ring-1 focus-visible:ring-cyan-400 transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 min-h-[44px] rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95"
          aria-label="Send command to bot"
        >
          Send
        </button>
      </form>
    </div>
  );
}
