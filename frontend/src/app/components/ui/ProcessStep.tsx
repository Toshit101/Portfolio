import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
  delay?: number;
}

export default function ProcessStep({ number, icon: Icon, title, body, delay = 0 }: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const, delay: delay / 1000 }}
    >
      <span
        className="font-bold text-primary/20 leading-none select-none"
        style={{ fontFamily: "var(--font-display)", fontSize: "5rem" }}
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded">
        <Icon size={18} className="text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3
          className="text-lg font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-[1.7]">{body}</p>
      </div>
    </motion.div>
  );
}
