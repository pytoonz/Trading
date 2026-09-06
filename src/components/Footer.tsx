import { scrollToId } from "../lib/smooth";

const COLS: { h: string; links: { t: string; id?: string }[] }[] = [
  {
    h: "Platform",
    links: [
      { t: "Market Intelligence", id: "markets" },
      { t: "Strategies", id: "strategy" },
      { t: "Performance", id: "performance" },
      { t: "Risk", id: "risk" },
    ],
  },
  {
    h: "Markets",
    links: [{ t: "New York" }, { t: "London" }, { t: "Dubai" }, { t: "Tokyo" }, { t: "Hong Kong" }, { t: "Singapore" }],
  },
  {
    h: "Legal",
    links: [{ t: "Privacy Policy" }, { t: "Terms of Use" }, { t: "Risk Disclosure" }, { t: "Cookies" }],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 px-5 pb-10 pt-16 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <button onClick={() => scrollToId("top")} className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
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
              </div>
              <span className="font-display text-lg font-semibold text-white">
                NOVA<span className="text-mint">.</span> Capital
              </span>
            </button>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-white/45">
              An institutional trading agency engineering smarter, disciplined
              trading solutions for modern markets.
            </p>
            <div className="mt-6 flex gap-3">
              {["𝕏", "in", "yt"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-[11px] text-white/50 transition hover:border-mint/40 hover:text-mint"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                {c.h}
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.t}>
                    <button
                      onClick={() => l.id && scrollToId(l.id)}
                      className="text-sm text-white/55 transition hover:text-mint"
                    >
                      {l.t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/6 bg-white/[0.02] p-5">
          <p className="text-[11px] leading-relaxed text-white/30">
            <span className="font-semibold text-white/50">Risk disclosure.</span>{" "}
            Trading and investing in financial markets involves substantial risk
            of loss. All performance figures, charts and metrics displayed across
            this site are illustrative demonstrations and do not represent
            verified, live or historical trading results. Nothing on this page
            constitutes investment, financial or legal advice.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-6 text-[11px] text-white/30 sm:flex-row">
          <span>© 2026 NOVA Capital. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.2em]">
            Engineered for the long game
          </span>
        </div>
      </div>
    </footer>
  );
}
