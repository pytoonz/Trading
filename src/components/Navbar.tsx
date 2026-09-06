import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";
import { scrollToId } from "../lib/smooth";
import Magnetic from "./ui/Magnetic";

const LINKS = [
  { label: "Markets", id: "markets" },
  { label: "Strategies", id: "strategy" },
  { label: "Technology", id: "performance" },
  { label: "Risk", id: "risk" },
  { label: "Contact", id: "cta" },
];

function Logo() {
  return (
    <button
      onClick={() => scrollToId("top")}
      className="group flex items-center gap-2.5"
      aria-label="NOVA Capital home"
    >
      <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
        <svg viewBox="0 0 40 40" className="h-6 w-6">
          <path
            d="M9 28 17 14l6 7 7-12"
            fill="none"
            stroke="#2cf0a6"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 -z-10 rounded-xl bg-mint/20 opacity-0 blur-md transition group-hover:opacity-100" />
      </div>
      <span className="font-display text-[17px] font-semibold tracking-tight text-white">
        NOVA<span className="text-mint">.</span>
        <span className="ml-1 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-white/40 sm:inline">
          Capital
        </span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-[900] flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border border-white/10 bg-ink-900/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="group relative px-4 py-2 text-[13px] font-medium tracking-wide text-white/65 transition hover:text-white"
                >
                  {l.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-mint to-electric transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Magnetic strength={0.25}>
              <button
                data-cursor
                onClick={() => go("cta")}
                className="btn-shine rounded-xl border border-mint/40 bg-mint/10 px-5 py-2.5 text-[13px] font-semibold text-mint transition hover:bg-mint hover:text-ink-950"
              >
                Start Trading
              </button>
            </Magnetic>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-[1001] grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            aria-label="Menu"
          >
            <div className="flex w-4 flex-col items-center gap-[5px]">
              <span
                className={cn(
                  "h-px w-full bg-white transition-all duration-300",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-mint transition-all duration-300",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[1000] flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="group flex w-full items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-mono text-xs text-mint/70">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-medium text-white/85 transition group-hover:text-mint">
                      {l.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              onClick={() => go("cta")}
              className="mt-10 w-fit rounded-2xl bg-mint px-8 py-4 font-semibold text-ink-950"
            >
              Build Your Strategy →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
