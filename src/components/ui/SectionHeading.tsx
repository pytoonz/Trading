import { RevealText, Fade } from "./primitives";
import { cn } from "../../utils/cn";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Fade>
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-mint/90">
            <span className="h-1 w-1 rounded-full bg-mint" />
            {eyebrow}
          </span>
        </Fade>
      )}
      <RevealText
        as="h2"
        text={title}
        className={cn(
          "max-w-4xl font-display text-[clamp(2rem,5.4vw,4.2rem)] font-semibold leading-[1.02] tracking-tight text-white",
          align === "center" && "mx-auto"
        )}
      />
      {sub && (
        <Fade delay={0.15}>
          <p
            className={cn(
              "max-w-2xl text-[15px] font-light leading-relaxed text-white/55",
              align === "center" && "mx-auto"
            )}
          >
            {sub}
          </p>
        </Fade>
      )}
    </div>
  );
}
