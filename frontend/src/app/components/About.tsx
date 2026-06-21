import { motion } from "motion/react";
import {
  Atom, Hexagon, Route, Leaf, Database, Webhook,
  KeyRound, Wind, GitBranch, Binary,
} from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import SkillTag from "./ui/SkillTag";

const SKILLS = [
  { label: "React", icon: Atom },
  { label: "Node.js", icon: Hexagon },
  { label: "Express", icon: Route },
  { label: "MongoDB", icon: Leaf },
  { label: "Mongoose", icon: Database },
  { label: "REST APIs", icon: Webhook },
  { label: "JWT Auth", icon: KeyRound },
  { label: "Tailwind CSS", icon: Wind },
  { label: "Git", icon: GitBranch },
  { label: "C", icon: Binary },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-32 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-16 items-start">
          {/* Intro + skills column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <SectionLabel>About</SectionLabel>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built on
              <br />
              fundamentals.
            </h2>
            <div className="space-y-5 text-muted-foreground leading-[1.75]">
              <p>
                I&apos;m Toshit — a full-stack developer studying electronics &amp;
                communication engineering. I like understanding a system from the
                hardware up, then building dependable web apps on top of that
                foundation with the MERN stack.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-10">
              <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-4">
                <span className="w-6 h-px bg-primary" aria-hidden="true" />
                Stack &amp; tools
              </p>
              <motion.div
                className="flex flex-wrap gap-2.5"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {SKILLS.map((skill) => (
                  <SkillTag key={skill.label} label={skill.label} icon={skill.icon} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Monogram column */}
          <motion.div
            className="flex justify-start lg:justify-end"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
          >
            <div
              className="w-40 h-40 bg-secondary flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{ borderRadius: 0 }}
              aria-hidden="true"
            >
              <span
                className="text-5xl font-bold text-primary select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                TK
              </span>
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/40" aria-hidden="true" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/40" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
