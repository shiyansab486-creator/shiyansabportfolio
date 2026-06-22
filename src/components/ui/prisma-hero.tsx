import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type CSSProperties, useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.toUpperCase().split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap uppercase ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#D4AF37]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Shared Global Background ---------------- */
const prismaVideoSrc =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export const PrismaBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-[0.38]"
        src={prismaVideoSrc}
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.24] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background-secondary)_0%,var(--background-secondary)_30%,var(--background)_100%)] opacity-85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--glow-blue),transparent_32%),radial-gradient(circle_at_top_right,var(--glow-purple),transparent_28%),radial-gradient(circle_at_bottom_left,var(--glow-cyan),transparent_30%),radial-gradient(circle_at_bottom_right,var(--glow-gold),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background-secondary),transparent_22%,transparent_78%,var(--background-secondary))] opacity-50" />
    </div>
  );
};

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  return (
    <section id="home" className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-none md:rounded-[2rem]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,var(--background-secondary)_45%,var(--background)_100%)] opacity-10 dark:opacity-40" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_16px_var(--accent-blue)]" />
                <span className="mono-font text-[11px] uppercase tracking-[0.32em] text-[var(--text-muted)]">
                  Based in Mangaluru · Available for Work
                </span>
              </div>

              <h1
                className="font-black leading-[0.85] tracking-[-0.07em] text-[24vw] sm:text-[22vw] md:text-[19vw] lg:text-[17vw] xl:text-[16vw] uppercase"
                style={{ color: "var(--text-primary)", fontFamily: "Inter, system-ui, sans-serif" }}
              >
                <WordsPullUp text="SHIYAN" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <WordsPullUpMultiStyle
                className="text-xs sm:text-sm md:text-base uppercase"
                segments={[
                  {
                    text: "I build brands, create stories, and develop digital experiences that connect strategy, design, and growth.",
                    className: "text-[var(--text-secondary)] leading-[1.2]",
                  },
                ]}
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-[linear-gradient(135deg,var(--accent-blue),var(--accent-purple))] py-1 pl-5 pr-1 text-sm font-medium text-white shadow-[0_0_25px_var(--glow-blue)] transition-all hover:gap-3 hover:shadow-[0_0_25px_var(--glow-blue),0_0_50px_var(--glow-purple)] sm:text-base"
                >
                  View My Work
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background)] transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[var(--text-primary)]" />
                  </span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-md transition hover:border-[var(--accent-blue)] hover:text-[var(--text-primary)] sm:text-base"
                >
                  Let&apos;s Connect
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
