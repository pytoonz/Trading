import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TICKERS = [
  "CONNECTING TO ORDER ROUTER",
  "SYNCING MARKET DATA",
  "CALIBRATING RISK ENGINE",
  "LOADING STRATEGY MATRIX",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [tick, setTick] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let p = 0;
    const id = window.setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        window.clearInterval(id);
      }
      setPct(Math.floor(p));
      setTick((t) => (t + 1) % TICKERS.length);
    }, 130);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (pct >= 100 && !doneRef.current) {
      doneRef.current = true;
      const t = window.setTimeout(onDone, 550);
      return () => window.clearTimeout(t);
    }
  }, [pct, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="grid-lines absolute inset-0 opacity-40" />
      </div>

      <div className="relative flex w-[min(90vw,460px)] flex-col items-center gap-8">
        {/* wordmark */}
        <div className="flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center">
            <svg viewBox="0 0 40 40" className="h-11 w-11">
              <path
                d="M8 28 16 14l5 7 6-11 6 18"
                fill="none"
                stroke="#2cf0a6"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="60"
                  to="0"
                  dur="1.6s"
                  fill="freeze"
                />
              </path>
            </svg>
            <div className="absolute inset-0 -z-10 rounded-full bg-mint/20 blur-xl" />
          </div>
          <div className="font-display text-xl font-semibold tracking-tight text-white">
            NOVA<span className="text-mint">.</span>
          </div>
        </div>

        {/* market sequence */}
        <div className="h-28 w-full space-y-3">
          {TICKERS.map((t, i) => {
            const isActive = i === tick;
            const activePct =
              isActive ? Math.min(100, Math.max(0, (pct / 100) * 100)) : i < tick ? 100 : 0;
            return (
              <div key={t} className="flex items-center gap-3">
                <span
                  className={`font-mono text-[9px] tracking-[0.2em] ${
                    i === tick ? "text-mint" : "text-white/25"
                  }`}
                >
                  {t}
                </span>
                <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-mint to-electric transition-all duration-200"
                    style={{ width: `${activePct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Initializing Terminal
          </span>
          <span className="font-mono text-3xl font-light tabular-nums text-white">
            {pct}
            <span className="text-base text-mint">%</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
