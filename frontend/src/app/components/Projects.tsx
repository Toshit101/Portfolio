import { motion } from "motion/react";
import { FolderGit2 } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import Button from "./ui/Button";

// When you have projects to show, restore the card grid:
//   import ProjectCard, { type Project } from "./ui/ProjectCard";
// then map a PROJECTS array over <ProjectCard /> inside a
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
// (ProjectCard.tsx is still in the repo, ready to use.)

const GITHUB_URL = "https://github.com/toshit101";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 md:py-32 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12"
        >
          <SectionLabel>Work</SectionLabel>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-foreground leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Currently
            <br />
            building.
          </h2>
        </motion.div>

        {/* Empty state — icon, one-line explanation, primary action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center text-center gap-5 py-16 px-6 border border-border rounded bg-card"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-secondary rounded">
            <FolderGit2 size={24} className="text-primary" aria-hidden="true" />
          </div>
          <div className="max-w-md">
            <h3
              className="text-xl font-bold text-foreground mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Case studies are on the way.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m polishing a few full-stack projects before they go up here.
              Until then, my work-in-progress and source live on GitHub.
            </p>
          </div>
          <Button variant="primary" size="md" as="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            View my GitHub →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
