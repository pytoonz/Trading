import { Suspense } from "react";
import SectionHeading from "./ui/SectionHeading";
import { Fade } from "./ui/primitives";
import GlobalMarketsScene from "../three/GlobalMarketsScene";

const HUBS = [
  { name: "New York", code: "NYSE", lat: "40.71°N" },
  { name: "London", code: "LSE", lat: "51.51°N" },
  { name: "Dubai", code: "DFM", lat: "25.20°N" },
  { name: "Singapore", code: "SGX", lat: "1.35°N" },
  { name: "Tokyo", code: "JPX", lat: "35.68°N" },
  { name: "Hong Kong", code: "HKEX", lat: "22.30°N" },
];

export default function GlobalMarkets() {
  return (
    <section id="global" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-electric/5 blur-[180px]" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* left copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Global Markets"
              title="Liquidity without borders."
              sub="Our order intelligence routes capital across six major financial hubs — sensing where depth, volatility and opportunity converge, second by second."
            />

            <Fade delay={0.1} className="mt-10 space-y-1.5">
              {HUBS.map((h, i) => (
                <div
                  key={h.name}
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint/40" />
                      <span
                        className="relative inline-flex h-2.5 w-2.5 rounded-full"
                        style={{ background: i % 2 === 0 ? "#3e9cff" : "#2cf0a6" }}
                      />
                    </span>
                    <span className="font-display text-[15px] text-white">{h.name}</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/35">
                    <span className="hidden sm:inline">{h.code}</span>
                    <span className="w-16 text-right">{h.lat}</span>
                  </div>
                </div>
              ))}
            </Fade>
          </div>

          {/* globe panel */}
          <Fade delay={0.15} y={50}>
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[radial-gradient(80%_70%_at_50%_40%,#071630_0%,#04060b_75%)]">
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
                Global Liquidity Network
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                Simulated topology
              </div>
              <div className="h-[420px] w-full sm:h-[560px]">
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border border-mint/30 border-t-mint" />
                    </div>
                  }
                >
                  <GlobalMarketsScene />
                </Suspense>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
