import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import SectionLabel from "./ui/SectionLabel";

const COLS = 18;
const ROWS = 12;
const TOTAL = COLS * ROWS;

function DotGrid() {
  const [lit, setLit] = useState<Set<number>>(new Set());
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      const next = new Set<number>();
      const count = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < count; i++) {
        next.add(Math.floor(Math.random() * TOTAL));
      }
      setLit(next);
    }, 800);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <div
      className="grid gap-3 opacity-80 select-none pointer-events-none"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      aria-hidden="true"
    >
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className="text-xs font-mono transition-colors duration-700"
          style={{ color: lit.has(i) ? "var(--primary)" : "rgba(255,255,255,0.08)" }}
        >
          ·
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const entry = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const, delay: delay / 1000 },
        };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16"
      aria-label="Introduction"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-12 md:gap-8 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <motion.div {...entry(0)}>
              <SectionLabel dot>Available for work</SectionLabel>
            </motion.div>

            <motion.h1
              className="font-bold leading-[0.95] tracking-tight text-foreground"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 7.5vw, 6rem)",
              }}
              {...entry(60)}
            >
              Building
              <br />
              <span className="text-primary">reliable</span> software,
              <br />
              end to end.
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-md"
              {...entry(120)}
            >
              Full-stack (MERN) developer with an electronics &amp; communication
              engineering background. I work across the stack — database, API, and
              interface — with a focus on clean, dependable code.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 pt-2" {...entry(180)}>
              <Button variant="primary" size="lg" onClick={scrollToContact}>
                Get in touch
              </Button>
              <Button variant="secondary" size="lg" as="a" href="/resume.pdf">
                Resume →
              </Button>
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <DotGrid />
          </motion.div>
        </div>
      </div>

      {/* Scroll caret */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown size={20} />
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-border" aria-hidden="true" />
    </section>
  );
}
