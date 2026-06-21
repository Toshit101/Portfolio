import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface SkillTagProps {
  label: string;
  icon: LucideIcon;
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function SkillTag({ label, icon: Icon }: SkillTagProps) {
  return (
    <motion.span
      variants={item}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -3 }}
      className="group inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase
        bg-secondary text-secondary-foreground rounded-md border border-border
        hover:border-primary/60 hover:text-foreground
        hover:shadow-[0_8px_20px_-6px_rgba(200,250,100,0.45)]
        transition-[color,border-color,box-shadow,background-color] duration-150
        cursor-default select-none"
    >
      <Icon
        className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-150"
        strokeWidth={2}
        aria-hidden="true"
      />
      {label}
    </motion.span>
  );
}
