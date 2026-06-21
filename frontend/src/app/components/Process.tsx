import { motion } from "motion/react";
import { Compass, Code2, Rocket } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import ProcessStep from "./ui/ProcessStep";

const STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Plan",
    body: "Understand the problem and model the data before writing code. Map the API surface, the database schema, and the edge cases up front so the build has a clear target instead of a moving one.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Build",
    body: "Work in vertical slices — database, API, and interface together — with reusable components and a clear separation of concerns. Small commits, tested as I go, so nothing turns into a black box.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Ship",
    body: "Deploy with environment config handled, errors surfaced, and both the happy path and failure states covered. Documented enough that the next person — or future me — is never guessing.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 md:py-32 border-b border-border bg-card"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16"
        >
          <SectionLabel>How I Work</SectionLabel>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From plan
            <br />
            to production.
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-[5.5rem] left-0 right-0 h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                icon={step.icon}
                title={step.title}
                body={step.body}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
