import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { initSmooth, destroySmooth } from "./lib/smooth";
import { ScrollTrigger } from "./lib/gsap";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarketIntelligence from "./components/MarketIntelligence";
import OurEdge from "./components/OurEdge";
import Performance from "./components/Performance";
import GlobalMarkets from "./components/GlobalMarkets";
import Strategy from "./components/Strategy";
import Risk from "./components/Risk";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initSmooth();
    return () => destroySmooth();
  }, []);

  // lock scroll while the loader is shown, recalibrate when it lifts
  useEffect(() => {
    if (ready) {
      document.body.style.overflow = "";
      const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 60);
      const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1600);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
    document.body.style.overflow = "hidden";
  }, [ready]);

  return (
    <>
      <a
        href="#markets"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>

      <Cursor />

      <AnimatePresence>
        {!ready && <Loader onDone={() => setReady(true)} />}
      </AnimatePresence>

      {ready && <Navbar />}

      <main>
        <Hero ready={ready} />
        <MarketIntelligence />
        <OurEdge />
        <Performance />
        <GlobalMarkets />
        <Strategy />
        <Risk />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
