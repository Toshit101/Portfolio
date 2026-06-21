import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SECTIONS = ["about", "projects", "process", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b border-border backdrop-blur-md bg-background/80" : "bg-transparent"
      }`}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="Back to top"
        >
          TK<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => smoothScroll(e, href)}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium transition-colors duration-100 relative pb-0.5
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded
                  ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.175, ease: [0.4, 0, 1, 1] as const }}
            style={{ overflow: "hidden" }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => smoothScroll(e, href)}
                  className="py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 last:border-0 transition-colors duration-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
