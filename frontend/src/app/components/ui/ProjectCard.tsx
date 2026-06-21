import { ExternalLink, Github } from "lucide-react";

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  bg: string;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  // Title links to the live demo if there is one, otherwise the source.
  const primaryUrl = project.liveUrl || project.githubUrl;

  return (
    <article
      className={`relative flex flex-col bg-card h-full group ${featured ? "md:col-span-2" : ""}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Image / banner area — decorative only, no hidden content */}
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/7]" : "aspect-[4/3]"} ${project.bg}`}>
        <span
          className="absolute bottom-4 right-6 font-bold text-foreground/5 select-none pointer-events-none leading-none transition-transform duration-300 group-hover:scale-105"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5rem, 12vw, 9rem)" }}
          aria-hidden="true"
        >
          {project.number}
        </span>
      </div>

      {/* Content — always visible, works on touch + keyboard */}
      <div className="flex flex-col gap-3 p-6 md:p-7 border-t border-border flex-1">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-xl md:text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-100 rounded
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card
                after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
          {project.description}
        </p>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-4 mt-1 relative z-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-100 rounded
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source on GitHub`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-100 rounded
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <Github size={14} aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
