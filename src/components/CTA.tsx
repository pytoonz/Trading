import CtaScene from "../three/CtaScene";
import { RevealText, Fade } from "./ui/primitives";
import Magnetic from "./ui/Magnetic";

export default function CTA() {
  return (
    <section id="cta" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-28">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_60%,#081a2e_0%,#04060b_75%)]" />
      <div className="pointer-events-none absolute inset-0">
        <CtaScene />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <Fade>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-mint">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-mint" />
            We trade around the clock
          </span>
        </Fade>

        <RevealText
          as="h2"
          text="THE MARKET NEVER"
          className="font-display text-[clamp(2.4rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight text-white"
        />
        <RevealText
          as="h2"
          text="STOPS. NEITHER DO WE."
          delay={0.12}
          className="text-gradient-brand font-display text-[clamp(2.4rem,8vw,6rem)] font-semibold leading-[0.95] tracking-tight"
        />

        <Fade delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] font-light leading-relaxed text-white/55">
            Put a disciplined, institutional-grade trading engine behind your
            ambition. Start with a no-pressure strategy consultation.
          </p>
        </Fade>

        <Fade delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic strength={0.4}>
              <button
                data-cursor-text="Begin"
                className="btn-shine group rounded-2xl bg-gradient-to-r from-mint to-jade px-9 py-4.5 text-[15px] font-semibold text-ink-950 shadow-[0_16px_60px_-14px_rgba(46,240,166,0.85)] transition hover:shadow-[0_20px_70px_-10px_rgba(46,240,166,1)]"
              >
                Build Your Trading Strategy
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button className="glass rounded-2xl px-8 py-4.5 text-[15px] font-medium text-white/85 transition hover:border-white/25">
                Book a Call
              </button>
            </Magnetic>
          </div>
        </Fade>

        <Fade delay={0.4}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
            Performance metrics are illustrative · Capital at risk
          </p>
        </Fade>
      </div>
    </section>
  );
}
